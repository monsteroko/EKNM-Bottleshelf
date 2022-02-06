using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EKNM_Bottleshelf.Models
{

    /// <summary>
    /// EF Model of cocktail
    /// </summary>
    [Table("Cocktails")]
    public class Cocktail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Column(TypeName = "text"), Required]
        public string Name { get; set; }
        [Column(TypeName = "integer"), Required, Range(0, int.MaxValue)]
        public int VolumeML { get; set; }
        [Column(TypeName = "text")]
        public string? Description { get; set; }
    }
}
