
    public class Order
    {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string UserId { get; set; }
    public string UserName { get; set; }
    public string StoreName { get; set; }
    public double PriceBeforeTax { get; set; }
    public double PriceAfterTax { get; set; }
    public int AmountOfSnoods { get; set; }
    public DateOnly Date { get; set; }
    public OrderDetails OrderDetails { get; set; }

}

