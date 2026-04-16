import Types "../types/writeup";
import Common "../types/common";
import WriteupLib "../lib/writeup";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

mixin (
  writeups : List.List<Types.Writeup>,
  adminRef : List.List<Principal>,
) {
  var nextId : Nat = 1;

  // ── Admin helpers ────────────────────────────────────────────────────────────

  func getAdmin() : ?Principal { adminRef.first() };

  func requireAdmin(caller : Principal) {
    switch (getAdmin()) {
      case (?a) {
        if (not Principal.equal(caller, a)) Runtime.trap("Unauthorized");
      };
      case null { Runtime.trap("Admin not set") };
    };
  };

  // ── Write operations (admin only) ────────────────────────────────────────────

  public shared ({ caller }) func createWriteup(
    input : Types.WriteupInput
  ) : async Common.Result<Nat, Text> {
    requireAdmin(caller);
    if (input.title == "") return #err("Title is required");

    let slug = if (input.slug == "") {
      WriteupLib.generateSlug(input.title, writeups)
    } else {
      if (WriteupLib.slugExists(input.slug, writeups)) {
        return #err("Slug already exists");
      };
      input.slug
    };

    let now = Time.now();
    let id = nextId;
    nextId += 1;

    writeups.add({
      id;
      title = input.title;
      slug;
      category = input.category;
      difficulty = input.difficulty;
      dateSolved = input.dateSolved;
      content = input.content;
      flag = input.flag;
      flagHidden = input.flagHidden;
      tags = input.tags;
      draft = input.draft;
      createdAt = now;
      updatedAt = now;
    });

    #ok id
  };

  public shared ({ caller }) func updateWriteup(
    id : Nat,
    input : Types.WriteupInput,
  ) : async Common.Result<(), Text> {
    requireAdmin(caller);

    switch (WriteupLib.findById(id, writeups)) {
      case null { #err("Writeup not found") };
      case (?existing) {
        let newSlug = if (input.slug == "") existing.slug
                      else input.slug;
        if (newSlug != existing.slug and WriteupLib.slugExists(newSlug, writeups)) {
          return #err("Slug already exists");
        };

        let now = Time.now();
        writeups.mapInPlace(func(w : Types.Writeup) : Types.Writeup {
          if (w.id == id) {
            {
              w with
              title = input.title;
              slug = newSlug;
              category = input.category;
              difficulty = input.difficulty;
              dateSolved = input.dateSolved;
              content = input.content;
              flag = input.flag;
              flagHidden = input.flagHidden;
              tags = input.tags;
              draft = input.draft;
              updatedAt = now;
            }
          } else w
        });
        #ok ()
      };
    };
  };

  public shared ({ caller }) func deleteWriteup(
    id : Nat
  ) : async Common.Result<(), Text> {
    requireAdmin(caller);
    switch (WriteupLib.findById(id, writeups)) {
      case null { #err("Writeup not found") };
      case (?_) {
        let filtered = writeups.filter(func(w : Types.Writeup) : Bool { w.id != id });
        writeups.clear();
        writeups.append(filtered);
        #ok ()
      };
    };
  };

  // ── Read operations (public) ─────────────────────────────────────────────────

  public query func getWriteup(id : Nat) : async ?Types.Writeup {
    WriteupLib.findById(id, writeups)
  };

  public query func getWriteupBySlug(slug : Text) : async ?Types.Writeup {
    WriteupLib.findBySlug(slug, writeups)
  };

  public query func listPublishedWriteups(
    page : Nat,
    pageSize : Nat,
  ) : async Types.PagedWriteups {
    WriteupLib.listPublished(page, pageSize, writeups)
  };

  public shared ({ caller }) func listAllWriteups() : async [Types.Writeup] {
    requireAdmin(caller);
    WriteupLib.listAll(writeups)
  };

  public query func listAllPublishedWriteups() : async [Types.Writeup] {
    WriteupLib.listAllPublished(writeups)
  };

  public query func searchWriteups(queryText : Text) : async [Types.Writeup] {
    WriteupLib.search(queryText, writeups)
  };

  public query func getWriteupsByCategory(
    category : Text
  ) : async [Types.Writeup] {
    WriteupLib.byCategory(category, writeups)
  };

  public query func getWriteupsByTag(tag : Text) : async [Types.Writeup] {
    WriteupLib.byTag(tag, writeups)
  };

  public query func getRelatedWriteups(
    id : Nat,
    limit : Nat,
  ) : async [Types.Writeup] {
    WriteupLib.related(id, limit, writeups)
  };

  public query func getAllTags() : async [Text] {
    WriteupLib.allTags(writeups)
  };

  public query func getRssFeed() : async Text {
    WriteupLib.buildRssFeed(writeups)
  };

  public query func getSitemap() : async Text {
    WriteupLib.buildSitemap(writeups)
  };

  public shared ({ caller }) func isAdmin() : async Bool {
    switch (getAdmin()) {
      case (?a) Principal.equal(caller, a);
      case null false;
    };
  };

  public shared ({ caller }) func claimAdmin() : async Common.Result<(), Text> {
    switch (getAdmin()) {
      case (?_) { #err("Admin already claimed") };
      case null {
        adminRef.add(caller);
        #ok ()
      };
    };
  };
};
