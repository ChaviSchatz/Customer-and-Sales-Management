
public class User
{
    private static int index = 0;
    public string Password { get; set; }
    //has to be protected 
    public string UniqId { get;}
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
    //    UniqId = 
    //}
}

