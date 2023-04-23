  public class OrderDetailsDTO
    {
    public double PriceBeforeTax { get; set; }
    public double PriceAfterTax { get; set; }
    public int AmountOfSnoods { get; set; }
    public DateTime Date { get; set; }
    public List<SnoodDTO> Details { get; set; }
}

