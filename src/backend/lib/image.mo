import Types "../types/writeup";
import Common "../types/common";
import List "mo:core/List";
import Storage "mo:caffeineai-object-storage/Storage";
import Int "mo:core/Int";

module {
  /// Construct an ImageRecord from upload parameters
  public func makeRecord(
    filename : Text,
    mimeType : Text,
    blob : Storage.ExternalBlob,
    now : Common.Timestamp,
  ) : Types.ImageRecord {
    // The blob itself acts as the access URL through object-storage proxy
    // We store the blob reference; the frontend retrieves the URL via getDirectURL()
    let unique = uniqueFilename(filename, now);
    {
      url = unique;
      thumbnailUrl = unique;
      filename = unique;
      mimeType;
      blob;
      uploadedAt = now;
    }
  };

  /// Find an image record by its URL
  public func findByUrl(
    url : Text,
    images : List.List<Types.ImageRecord>,
  ) : ?Types.ImageRecord {
    images.find(func(img : Types.ImageRecord) : Bool { img.url == url });
  };

  /// Generate a unique filename by prepending a nanosecond timestamp
  public func uniqueFilename(
    original : Text,
    now : Common.Timestamp,
  ) : Text {
    now.toText() # "_" # original
  };
};
