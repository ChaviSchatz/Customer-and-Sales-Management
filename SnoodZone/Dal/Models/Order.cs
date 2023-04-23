
    public class Order
    {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string UserId { get; set; }
    public bool Status { get; set; }
    public OrderDetails OrderDetails { get; set; }

}

