using System.ComponentModel.DataAnnotations;

namespace EKNM_Bottleshelf.Models
{
    public class Cocktail
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string? Description { get; set; }
        public Dictionary<int, double> DryIngrinients { get; set; }
        public Dictionary<int, double> LiquidIngrinients { get; set; }
    }
}
