import Types "../types/writeup";
import Common "../types/common";
import ImageLib "../lib/image";
import List "mo:core/List";
import Storage "mo:caffeineai-object-storage/Storage";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

mixin (
  images : List.List<Types.ImageRecord>,
  adminRef : List.List<Principal>,
) {
  func requireImageAdmin(caller : Principal) {
    switch (adminRef.first()) {
      case (?a) {
        if (not Principal.equal(caller, a)) Runtime.trap("Unauthorized");
      };
      case null { Runtime.trap("Admin not set") };
    };
  };

  // ── Write operations (admin only) ────────────────────────────────────────────

  public shared ({ caller }) func uploadImage(
    filename : Text,
    mimeType : Text,
    blob : Storage.ExternalBlob,
  ) : async Common.Result<Text, Text> {
    requireImageAdmin(caller);
    let now = Time.now();
    let record = ImageLib.makeRecord(filename, mimeType, blob, now);
    images.add(record);
    #ok(record.url)
  };

  public shared ({ caller }) func deleteImage(
    url : Text
  ) : async Common.Result<(), Text> {
    requireImageAdmin(caller);
    switch (ImageLib.findByUrl(url, images)) {
      case null { #err("Image not found") };
      case (?_) {
        let filtered = images.filter(func(img : Types.ImageRecord) : Bool { img.url != url });
        images.clear();
        images.append(filtered);
        #ok ()
      };
    };
  };

  // ── Read operations (admin only) ─────────────────────────────────────────────

  public shared ({ caller }) func listImages() : async [Types.ImageRecord] {
    requireImageAdmin(caller);
    images.toArray()
  };
};
