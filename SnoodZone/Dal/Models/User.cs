
partial class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string ObjId { get; set; }

    //has to be protected 
    public string Id { get; set; }
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public Address Address { get; set; }
    public string StoreName { get; set; }
    public string EmailAddress { get; set; }
    public List<Order> Orders { get; set; }
}

