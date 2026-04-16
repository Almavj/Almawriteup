module {
  public type Timestamp = Int; // nanoseconds since epoch
  public type UserId = Principal;

  public type Result<T, E> = { #ok : T; #err : E };
};
