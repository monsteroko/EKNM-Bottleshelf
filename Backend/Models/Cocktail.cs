using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EKNM_Bottleshelf.Models
{
    [Table("Cocktails")]
    public class Cocktail
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required, Range(0, int.MaxValue)]
        public int Volume { get; set; }
        public string? Description { get; set; }
        public string DryIngrinients { get; set; }
        public string LiquidIngrinients { get; set; }
    }
}
