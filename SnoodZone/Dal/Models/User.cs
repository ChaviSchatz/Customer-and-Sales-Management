
using MongoDB.Bson.Serialization.Attributes;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string Password { get; set; }
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public Address Address { get; set; }
    public string StoreName { get; set; }
    public string EmailAddress { get; set; }
    public List<Order> Orders { get; set; }

}

