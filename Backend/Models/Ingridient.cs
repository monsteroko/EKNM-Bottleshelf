using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EKNM_Bottleshelf.Models
{
    public abstract class Ingridient
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "text"), Required]
        public string Name { get; set; }
        [Column(TypeName = "double precision"), Range(0,double.MaxValue)]
        public double Price { get; set; }
        public string? Description { get; set; }
        [Column(TypeName = "integer"), Range(0, int.MaxValue)]
        public int Amount { get; set; }
    }
}
