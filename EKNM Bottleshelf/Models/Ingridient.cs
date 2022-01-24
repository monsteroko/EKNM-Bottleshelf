using System.ComponentModel.DataAnnotations;

namespace EKNM_Bottleshelf.Models
{
    public abstract class Ingridient
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Range(0,double.MaxValue)]
        public double Price { get; set; }
        public string? Description { get; set; }
        [Range(0, int.MaxValue)]
        public int Amount { get; set; }
    }
}
