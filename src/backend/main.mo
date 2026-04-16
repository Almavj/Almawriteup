import List "mo:core/List";
import Types "types/writeup";
import WriteupApi "mixins/writeup-api";
import ImageApi "mixins/image-api";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";

actor {
  // ── Stable state ─────────────────────────────────────────────────────────────
  let writeups = List.empty<Types.Writeup>();
  let images = List.empty<Types.ImageRecord>();
  // Shared admin reference: 0 elements = unclaimed, 1 element = admin principal
  let adminRef = List.empty<Principal>();

  // ── Mixins ───────────────────────────────────────────────────────────────────
  include MixinObjectStorage();
  include WriteupApi(writeups, adminRef);
  include ImageApi(images, adminRef);
};
