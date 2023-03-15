
    public class ManagerOrder
    {
    //[BsonId]
    //[BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string UserId { get; set; }
    public string UserName { get; set; }
    public string StoreName { get; set; }
    public bool Status { get; set; }
    public UserOrder Order { get; set; }

}

