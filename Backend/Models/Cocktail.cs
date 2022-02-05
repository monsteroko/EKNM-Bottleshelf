using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EKNM_Bottleshelf.Models
{
    [Table("Cocktails")]
    public class Cocktail
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "text"), Required]
        public string Name { get; set; }
        [Column(TypeName = "integer"), Required, Range(0, int.MaxValue)]
        public int VolumeML { get; set; }
        [Column(TypeName = "text")]
        public string? Description { get; set; }
    }
}
