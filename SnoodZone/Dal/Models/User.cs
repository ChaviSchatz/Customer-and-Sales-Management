
using MongoDB.Bson.Serialization.Attributes;

public class User
{
    private static int index = 0;
    public ObjectId Id { get;private set; }
    //public string UniqId { get; private set; }
    public string Password { get; set; }
    //public Guid UniqId { get; private set; }
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public Address Address { get; set; }
    public string StoreName { get; set; }
    public string EmailAddress { get; set; }
    public List<Order> Orders { get; set; }

    ///לשאול את המורה באיזה ערך ייחודי כדאי להשתמש?!
    ///ולא לשכוח לעדכן את כל המקומות
    //public User()
    //{
    //    UniqId = ;
    //}
}

