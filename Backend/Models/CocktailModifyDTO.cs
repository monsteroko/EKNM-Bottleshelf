﻿namespace EKNM_Bottleshelf.Models
{
    public class CocktailModifyDTO
    {
        public string Name { get; set; }
        public string? Description { get; set; }

        public Dictionary<int,int>? drymap { get; set; }

        public Dictionary<int, int> liqmap { get; set; }

    }
}
