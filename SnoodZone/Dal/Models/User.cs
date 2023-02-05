
partial class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string StoreName { get; set; }
    public string EmailAddress { get; set; }
}

