using System.ComponentModel.DataAnnotations;

namespace EKNM_Bottleshelf.Models
{
    public abstract class Ingridient
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public int Amount { get; set; }
    }
}
