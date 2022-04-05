namespace EKNM_Bottleshelf.Models
{
    public class LiquidDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string? Description { get; set; }
        public int Amount { get; set; }
        public int Volume { get; set; }
        public double Degree { get; set; }
        public double Bottles { get; set; }
    }
}
