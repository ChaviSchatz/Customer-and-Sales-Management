
    public class Admin
    {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string Password { get; set; }
    public string Name { get; set; }
    public string EmailAddress { get; set; }

}

