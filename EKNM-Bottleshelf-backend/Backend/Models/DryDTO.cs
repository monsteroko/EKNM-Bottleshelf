namespace EKNM_Bottleshelf.Models
{
    public class DryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string? Description { get; set; }
        public int Amount { get; set; }
        public int Weight { get; set; }
        public double Packs {get; set; }
    }
}
