import Types "../types/writeup";
import List "mo:core/List";
import Array "mo:core/Array";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";

module {
  let BASE_URL = "https://example.com";

  // ── Helpers ───────────────────────────────────────────────────────────────────

  func isAlphaNum(c : Char) : Bool {
    (c >= 'a' and c <= 'z') or (c >= '0' and c <= '9') or c == '-'
  };

  func categoryToText(cat : Types.Category) : Text {
    switch cat {
      case (#pwn) "pwn";
      case (#web) "web";
      case (#crypto) "crypto";
      case (#forensics) "forensics";
      case (#rev) "rev";
      case (#misc) "misc";
      case (#osint) "osint";
    };
  };

  func textToCategory(t : Text) : ?Types.Category {
    switch (t) {
      case "pwn"      ?#pwn;
      case "web"      ?#web;
      case "crypto"   ?#crypto;
      case "forensics" ?#forensics;
      case "rev"      ?#rev;
      case "misc"     ?#misc;
      case "osint"    ?#osint;
      case _          null;
    };
  };

  func isPublished(w : Types.Writeup) : Bool { not w.draft };

  func compareByDate(a : Types.Writeup, b : Types.Writeup) : { #less; #equal; #greater } {
    Int.compare(b.createdAt, a.createdAt)
  };

  func sortedDesc(list : List.List<Types.Writeup>) : [Types.Writeup] {
    let arr = list.toArray();
    arr.sort(compareByDate)
  };

  /// Auto-generate a URL-friendly slug from title, ensuring uniqueness
  public func generateSlug(
    title : Text,
    writeups : List.List<Types.Writeup>,
  ) : Text {
    // lowercase → keep alphanumeric, replace spaces with hyphens, strip rest
    let lower = title.toLower();
    let raw = lower.flatMap(func(c : Char) : Text {
      if (c == ' ') "-"
      else if (isAlphaNum(c)) Text.fromChar(c)
      else ""
    });
    // deduplicate consecutive hyphens
    var base = raw;
    label dedup loop {
      let replaced = base.replace(#text "--", "-");
      if (replaced == base) break dedup;
      base := replaced;
    };
    // strip leading/trailing hyphens
    base := switch (base.stripStart(#char '-')) { case (?s) s; case null base };
    base := switch (base.stripEnd(#char '-')) { case (?s) s; case null base };
    if (base == "") { base := "writeup" };

    // ensure uniqueness
    if (not slugExists(base, writeups)) return base;
    var suffix = 1;
    label uniqueness loop {
      let candidate = base # "-" # suffix.toText();
      if (not slugExists(candidate, writeups)) return candidate;
      suffix += 1;
    };
    // unreachable, but Motoko needs a return
    base
  };

  /// Check whether a slug is already in use
  public func slugExists(
    slug : Text,
    writeups : List.List<Types.Writeup>,
  ) : Bool {
    switch (writeups.find(func(w : Types.Writeup) : Bool { w.slug == slug })) {
      case (?_) true;
      case null  false;
    };
  };

  /// Find a writeup by numeric id
  public func findById(
    id : Nat,
    writeups : List.List<Types.Writeup>,
  ) : ?Types.Writeup {
    writeups.find(func(w : Types.Writeup) : Bool { w.id == id });
  };

  /// Find a writeup by slug
  public func findBySlug(
    slug : Text,
    writeups : List.List<Types.Writeup>,
  ) : ?Types.Writeup {
    writeups.find(func(w : Types.Writeup) : Bool { w.slug == slug });
  };

  /// Return only published (non-draft) writeups sorted newest-first, paginated
  public func listPublished(
    page : Nat,
    pageSize : Nat,
    writeups : List.List<Types.Writeup>,
  ) : Types.PagedWriteups {
    let published = writeups.filter(isPublished);
    let sorted = sortedDesc(published);
    let total = sorted.size();
    let start = page * pageSize;
    if (start >= total) {
      return { writeups = []; total };
    };
    let end = if (start + pageSize > total) total else start + pageSize;
    { writeups = sorted.sliceToArray(start, end); total }
  };

  /// Return all writeups (admin view, includes drafts)
  public func listAll(
    writeups : List.List<Types.Writeup>,
  ) : [Types.Writeup] {
    sortedDesc(writeups)
  };

  /// Return all published (non-draft) writeups sorted newest-first (public, no pagination)
  public func listAllPublished(
    writeups : List.List<Types.Writeup>,
  ) : [Types.Writeup] {
    sortedDesc(writeups.filter(isPublished))
  };

  /// Full-text search across title, tags, and content (published only)
  public func search(
    queryText : Text,
    writeups : List.List<Types.Writeup>,
  ) : [Types.Writeup] {
    let q = queryText.toLower();
    writeups.filter(func(w : Types.Writeup) : Bool {
      if (w.draft) return false;
      if (w.title.toLower().contains(#text q)) return true;
      // search first 500 chars of content
      let contentPreview = (
        if (w.content.size() > 500) {
          Text.fromIter(w.content.toIter().take(500))
        } else w.content
      ).toLower();
      if (contentPreview.contains(#text q)) return true;
      // search tags
      for (tag in w.tags.values()) {
        if (tag.toLower().contains(#text q)) return true;
      };
      false
    }).toArray()
  };

  /// Filter published writeups by category label text
  public func byCategory(
    categoryText : Text,
    writeups : List.List<Types.Writeup>,
  ) : [Types.Writeup] {
    switch (textToCategory(categoryText.toLower())) {
      case null [];
      case (?cat) {
        writeups.filter(func(w : Types.Writeup) : Bool {
          isPublished(w) and w.category == cat
        }).toArray()
      };
    };
  };

  /// Filter published writeups by tag
  public func byTag(
    tag : Text,
    writeups : List.List<Types.Writeup>,
  ) : [Types.Writeup] {
    let lowerTag = tag.toLower();
    writeups.filter(func(w : Types.Writeup) : Bool {
      if (not isPublished(w)) return false;
      for (t in w.tags.values()) {
        if (t.toLower() == lowerTag) return true;
      };
      false
    }).toArray()
  };

  /// Return up to `limit` published writeups related to a given writeup
  /// Relation is defined by shared tags or same category
  public func related(
    id : Nat,
    limit : Nat,
    writeups : List.List<Types.Writeup>,
  ) : [Types.Writeup] {
    switch (findById(id, writeups)) {
      case null [];
      case (?source) {
        let sourceTags = Set.fromArray(source.tags);
        let candidates = writeups.filter(func(w : Types.Writeup) : Bool {
          if (w.id == id or w.draft) return false;
          if (w.category == source.category) return true;
          for (tag in w.tags.values()) {
            if (sourceTags.contains(tag)) return true;
          };
          false
        });
        let sorted = sortedDesc(candidates);
        let cap = if (sorted.size() < limit) sorted.size() else limit;
        sorted.sliceToArray(0, cap)
      };
    };
  };

  /// Collect unique tag strings across all published writeups
  public func allTags(
    writeups : List.List<Types.Writeup>,
  ) : [Text] {
    let tagSet = Set.empty<Text>();
    writeups.forEach(func(w : Types.Writeup) {
      if (not w.draft) {
        for (tag in w.tags.values()) {
          tagSet.add(tag);
        };
      };
    });
    let arr = tagSet.toArray();
    arr.sort()
  };

  // ── Feed helpers ──────────────────────────────────────────────────────────────

  func escapeXml(s : Text) : Text {
    var result = s;
    result := result.replace(#text "&", "&amp;");
    result := result.replace(#text "<", "&lt;");
    result := result.replace(#text ">", "&gt;");
    result := result.replace(#text "\"", "&quot;");
    result
  };

  /// Build an Atom/RSS 2.0 feed XML string
  public func buildRssFeed(
    writeups : List.List<Types.Writeup>,
  ) : Text {
    let sorted = sortedDesc(writeups.filter(isPublished));

    var items = "";
    for (w in sorted.values()) {
      let link = BASE_URL # "/writeup/" # w.slug;
      let title = escapeXml(w.title);
      // Use first 300 chars of content as description (raw JSON, but safe enough)
      let descRaw = if (w.content.size() > 300) {
        Text.fromIter(w.content.toIter().take(300))
      } else w.content;
      let desc = escapeXml(descRaw);
      items #= "<item>"
        # "<title>" # title # "</title>"
        # "<link>" # link # "</link>"
        # "<guid>" # link # "</guid>"
        # "<pubDate>" # w.dateSolved # "</pubDate>"
        # "<description>" # desc # "</description>"
        # "<category>" # escapeXml(categoryToText(w.category)) # "</category>"
        # "</item>";
    };

    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
    # "<rss version=\"2.0\">"
    # "<channel>"
    # "<title>CTF Writeups</title>"
    # "<link>" # BASE_URL # "</link>"
    # "<description>CTF challenge writeups and solutions</description>"
    # items
    # "</channel>"
    # "</rss>"
  };

  /// Build a sitemap.xml string
  public func buildSitemap(
    writeups : List.List<Types.Writeup>,
  ) : Text {
    var urls = "<url><loc>" # BASE_URL # "/</loc></url>";
    writeups.forEach(func(w : Types.Writeup) {
      if (not w.draft) {
        urls #= "<url><loc>" # BASE_URL # "/writeup/" # w.slug # "</loc></url>";
      };
    });

    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
    # "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">"
    # urls
    # "</urlset>"
  };
};
