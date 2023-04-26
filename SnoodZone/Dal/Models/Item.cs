
    public class Item
    {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public bool InStock { get; set; }
    public string Code { get; set; }
    public string Description { get; set; }
    public int Price { get; set; }
    public List<string> Colors { get; set; }
}
