import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type Category = {
    #pwn;
    #web;
    #crypto;
    #forensics;
    #rev;
    #misc;
    #osint;
  };

  public type Difficulty = {
    #easy;
    #medium;
    #hard;
    #insane;
  };

  public type Writeup = {
    id : Nat;
    title : Text;
    slug : Text;
    category : Category;
    difficulty : Difficulty;
    dateSolved : Text; // ISO date string e.g. "2024-01-15"
    content : Text;   // JSON-serialized block array
    flag : Text;
    flagHidden : Bool;
    tags : [Text];
    draft : Bool;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type WriteupInput = {
    title : Text;
    slug : Text;
    category : Category;
    difficulty : Difficulty;
    dateSolved : Text;
    content : Text;
    flag : Text;
    flagHidden : Bool;
    tags : [Text];
    draft : Bool;
  };

  public type PagedWriteups = {
    writeups : [Writeup];
    total : Nat;
  };

  public type ImageRecord = {
    url : Text;
    thumbnailUrl : Text;
    filename : Text;
    mimeType : Text;
    blob : Storage.ExternalBlob;
    uploadedAt : Common.Timestamp;
  };
};
