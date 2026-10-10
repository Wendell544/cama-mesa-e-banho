// products.js - Camisetas Básicas + Cama, Mesa e Banho (atacado)
const allProducts = [];

function getPricesBySize(basePriceSmallest = 34) {
    return {
        P: basePriceSmallest,
        M: basePriceSmallest + 1,
        G: basePriceSmallest + 2,
        GG: basePriceSmallest + 3
    };
}

const descVariadas = [
    "100% algodão. Gola redonda. Não encolhe na lavagem.",
    "Produto durável. 100% algodão. Gola redonda.",
    "100% algodão. Não encolhe na lavagem. Gola redonda. Durável.",
    "Gola redonda. 100% algodão. Produto durável. Não encolhe.",
    "Durável e resistente. 100% algodão. Gola redonda. Não encolhe.",
    "100% algodão premium. Gola redonda. Não deforma na lavagem.",
    "Tecido resistente. 100% algodão. Gola redonda. Durável.",
    "Gola redonda clássica. 100% algodão. Não encolhe. Produto durável."
];

function descricaoAleatoria(index) {
    return descVariadas[index % descVariadas.length];
}

// ========== CAMISETAS BÁSICAS (featured) IDs 1 a 20 ==========
allProducts.push({
    id: 1,
    name: "Camiseta Preto",
    category: "featured",
    description: descricaoAleatoria(0),
    variants: {
        preto: {
            colorLabel: "Preto", bgColor: "#000000",
            prices: getPricesBySize(34), sizes: ["P", "M", "G", "GG"],
            image: "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_1_img_1.webp",
            gallery: [
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_1_img_1.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_1_img_2.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_1_img_3.webp"
            ]
        }
    }
});
allProducts.push({
    id: 2,
    name: "Camiseta Branco Premium",
    category: "featured",
    description: descricaoAleatoria(1),
    variants: {
        branco: {
            colorLabel: "Branco", bgColor: "#FFFFFF",
            prices: getPricesBySize(34), sizes: ["P", "M", "G", "GG"],
            image: "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_2_img_1.webp",
            gallery: [
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_2_img_1.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_2_img_2.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_2_img_3.webp"
            ]
        }
    }
});
allProducts.push({
    id: 3,
    name: "Camiseta Azul Royal",
    category: "featured",
    description: descricaoAleatoria(2),
    variants: {
        azul_royal: {
            colorLabel: "Azul Royal", bgColor: "#4169E1",
            prices: getPricesBySize(34), sizes: ["P", "M", "G", "GG"],
            image: "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_3_img_1.webp",
            gallery: [
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_3_img_1.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_3_img_2.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_3_img_3.webp"
            ]
        }
    }
});
allProducts.push({
    id: 4,
    name: "Camiseta Vermelho",
    category: "featured",
    description: descricaoAleatoria(3),
    variants: {
        vermelho: {
            colorLabel: "Vermelho", bgColor: "#FF0000",
            prices: getPricesBySize(34), sizes: ["P", "M", "G", "GG"],
            image: "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_4_img_1.webp",
            gallery: [
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_4_img_1.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_4_img_2.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_4_img_3.webp"
            ]
        }
    }
});
allProducts.push({
    id: 5,
    name: "Camiseta Verde Militar",
    category: "featured",
    description: descricaoAleatoria(4),
    variants: {
        verde_militar: {
            colorLabel: "Verde Militar", bgColor: "#4B5320",
            prices: getPricesBySize(34), sizes: ["P", "M", "G", "GG"],
            image: "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_5_img_1.webp",
            gallery: [
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_5_img_1.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_5_img_2.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_5_img_3.webp"
            ]
        }
    }
});
allProducts.push({
    id: 6,
    name: "Camiseta Laranja",
    category: "featured",
    description: descricaoAleatoria(5),
    variants: {
        laranja: {
            colorLabel: "Laranja", bgColor: "#FFA500",
            prices: getPricesBySize(34), sizes: ["P", "M", "G", "GG"],
            image: "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_6_img_1.webp",
            gallery: [
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_6_img_1.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_6_img_2.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_6_img_3.webp"
            ]
        }
    }
});
allProducts.push({
    id: 7,
    name: "Camiseta Cinza Escuro",
    category: "featured",
    description: descricaoAleatoria(6),
    variants: {
        cinza_escuro: {
            colorLabel: "Cinza Escuro", bgColor: "#A9A9A9",
            prices: getPricesBySize(34), sizes: ["P", "M", "G", "GG"],
            image: "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_7_img_1.webp",
            gallery: [
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_7_img_1.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_7_img_2.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_7_img_3.webp"
            ]
        }
    }
});
allProducts.push({
    id: 8,
    name: "Camiseta Rosa Claro",
    category: "featured",
    description: descricaoAleatoria(7),
    variants: {
        rosa_claro: {
            colorLabel: "Rosa Claro", bgColor: "#FFB6C1",
            prices: getPricesBySize(34), sizes: ["P", "M", "G", "GG"],
            image: "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_8_img_1.webp",
            gallery: [
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_8_img_1.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_8_img_2.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_8_img_3.webp"
            ]
        }
    }
});
allProducts.push({
    id: 9,
    name: "Camiseta Bege",
    category: "featured",
    description: descricaoAleatoria(0),
    variants: {
        bege: {
            colorLabel: "Bege", bgColor: "#F5F5DC",
            prices: getPricesBySize(34), sizes: ["P", "M", "G", "GG"],
            image: "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_9_img_1.webp",
            gallery: [
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_9_img_1.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_9_img_2.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_9_img_3.webp"
            ]
        }
    }
});
allProducts.push({
    id: 10,
    name: "Camiseta Off-White",
    category: "featured",
    description: descricaoAleatoria(1),
    variants: {
        offwhite: {
            colorLabel: "Off-White", bgColor: "#FDF5E6",
            prices: getPricesBySize(34), sizes: ["P", "M", "G", "GG"],
            image: "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_10_img_1.webp",
            gallery: [
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_10_img_1.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_10_img_2.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_10_img_3.webp"
            ]
        }
    }
});
allProducts.push({
    id: 11,
    name: "Camiseta Vinho",
    category: "featured",
    description: descricaoAleatoria(2),
    variants: {
        vinho: {
            colorLabel: "Vinho", bgColor: "#722F37",
            prices: getPricesBySize(34), sizes: ["P", "M", "G", "GG"],
            image: "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_11_img_1.webp",
            gallery: [
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_11_img_1.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_11_img_2.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_11_img_3.webp"
            ]
        }
    }
});
allProducts.push({
    id: 12,
    name: "Camiseta Amarelo",
    category: "featured",
    description: descricaoAleatoria(3),
    variants: {
        amarelo: {
            colorLabel: "Amarelo", bgColor: "#FFD700",
            prices: getPricesBySize(34), sizes: ["P", "M", "G", "GG"],
            image: "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_12_img_1.webp",
            gallery: [
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_12_img_1.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_12_img_2.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_12_img_3.webp"
            ]
        }
    }
});
allProducts.push({
    id: 13,
    name: "Camiseta Verde Oliva",
    category: "featured",
    description: descricaoAleatoria(4),
    variants: {
        verde_oliva: {
            colorLabel: "Verde Oliva", bgColor: "#4B5320",
            prices: getPricesBySize(34), sizes: ["P", "M", "G", "GG"],
            image: "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_13_img_1.webp",
            gallery: [
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_13_img_1.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_13_img_2.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_13_img_3.webp"
            ]
        }
    }
});
allProducts.push({
    id: 14,
    name: "Camiseta Azul Marinho",
    category: "featured",
    description: descricaoAleatoria(5),
    variants: {
        azul_marinho: {
            colorLabel: "Azul Marinho", bgColor: "#000080",
            prices: getPricesBySize(34), sizes: ["P", "M", "G", "GG"],
            image: "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_14_img_1.webp",
            gallery: [
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_14_img_1.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_14_img_2.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_14_img_3.webp"
            ]
        }
    }
});
allProducts.push({
    id: 15,
    name: "Camiseta Caqui",
    category: "featured",
    description: descricaoAleatoria(6),
    variants: {
        caqui: {
            colorLabel: "Caqui", bgColor: "#C3B091",
            prices: getPricesBySize(34), sizes: ["P", "M", "G", "GG"],
            image: "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_15_img_1.webp",
            gallery: [
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_15_img_1.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_15_img_2.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_15_img_3.webp"
            ]
        }
    }
});
allProducts.push({
    id: 16,
    name: "Camiseta Azul Claro",
    category: "featured",
    description: descricaoAleatoria(7),
    variants: {
        azul_claro: {
            colorLabel: "Azul Claro", bgColor: "#87CEEB",
            prices: getPricesBySize(34), sizes: ["P", "M", "G", "GG"],
            image: "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_16_img_1.webp",
            gallery: [
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_16_img_1.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_16_img_2.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_16_img_3.webp"
            ]
        }
    }
});
allProducts.push({
    id: 17,
    name: "Camiseta Rosa",
    category: "featured",
    description: descricaoAleatoria(0),
    variants: {
        rosa: {
            colorLabel: "Rosa", bgColor: "#FFC0CB",
            prices: getPricesBySize(34), sizes: ["P", "M", "G", "GG"],
            image: "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_17_img_1.webp",
            gallery: [
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_17_img_1.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_17_img_2.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_17_img_3.webp"
            ]
        }
    }
});
allProducts.push({
    id: 18,
    name: "Camiseta Cinza",
    category: "featured",
    description: descricaoAleatoria(1),
    variants: {
        cinza: {
            colorLabel: "Cinza", bgColor: "#808080",
            prices: getPricesBySize(34), sizes: ["P", "M", "G", "GG"],
            image: "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_18_img_1.webp",
            gallery: [
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_18_img_1.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_18_img_2.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_18_img_3.webp"
            ]
        }
    }
});
allProducts.push({
    id: 19,
    name: "Camiseta Terracota",
    category: "featured",
    description: descricaoAleatoria(2),
    variants: {
        marrom_claro: {
            colorLabel: "Terracota", bgColor: "#CD853F",
            prices: getPricesBySize(34), sizes: ["P", "M", "G", "GG"],
            image: "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_19_img_1.webp",
            gallery: [
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_19_img_1.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_19_img_2.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_19_img_3.webp"
            ]
        }
    }
});
allProducts.push({
    id: 20,
    name: "Camiseta Branco Gelo",
    category: "featured",
    description: descricaoAleatoria(3),
    variants: {
        branco_premium: {
            colorLabel: "Branco Premium", bgColor: "#FFF8E7",
            prices: getPricesBySize(34), sizes: ["P", "M", "G", "GG"],
            image: "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_20_img_1.webp",
            gallery: [
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_20_img_1.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_20_img_2.webp",
                "https://raw.githubusercontent.com/Wendell544/imagens-produtos/main/produto_20_img_3.webp"
            ]
        }
    }
});

// ========== CAMA, MESA E BANHO (atacado - mínimo 30 un.) ==========
// 👉 Substitua os dados abaixo pelos seus produtos reais (imagens, preços, tamanhos)

allProducts.push({
    id: 100,
    name: "Jogo de Lençol Casal 4 Peças",
    category: "cama_mesa_banho",
    minQuantity: 30,
    description: "100% algodão fio 200. Macio, durável e não desbota. Venda no atacado — mínimo 30 unidades.",
    variants: {
        casal: {
            colorLabel: "Casal",
            bgColor: "#0D9488",
            prices: { "Casal": 45.00 },
            sizes: ["Casal"],
            image: "https://picsum.photos/seed/cmb1/800/800",
            gallery: [
                "https://picsum.photos/seed/cmb1/800/800",
                "https://picsum.photos/seed/cmb1b/800/800"
            ]
        }
    }
});

allProducts.push({
    id: 101,
    name: "Jogo de Lençol Solteiro 3 Peças",
    category: "cama_mesa_banho",
    minQuantity: 30,
    description: "100% algodão fio 200. Perfeito para revenda. Venda no atacado — mínimo 30 unidades.",
    variants: {
        solteiro: {
            colorLabel: "Solteiro",
            bgColor: "#14B8A6",
            prices: { "Solteiro": 35.00 },
            sizes: ["Solteiro"],
            image: "https://picsum.photos/seed/cmb2/800/800",
            gallery: ["https://picsum.photos/seed/cmb2/800/800"]
        }
    }
});

allProducts.push({
    id: 102,
    name: "Jogo de Toalhas 5 Peças",
    category: "cama_mesa_banho",
    minQuantity: 30,
    description: "Toalhas felpudas de alta absorção. Kit completo para revenda. Mínimo 30 unidades.",
    variants: {
        padrao: {
            colorLabel: "Padrão",
            bgColor: "#06B6D4",
            prices: { "Padrão": 38.00 },
            sizes: ["Padrão"],
            image: "https://picsum.photos/seed/cmb3/800/800",
            gallery: ["https://picsum.photos/seed/cmb3/800/800"]
        }
    }
});

allProducts.push({
    id: 103,
    name: "Cobertor Casal Microfibra",
    category: "cama_mesa_banho",
    minQuantity: 30,
    description: "Cobertor macio e leve em microfibra. Ideal para revenda. Mínimo 30 unidades.",
    variants: {
        casal: {
            colorLabel: "Casal",
            bgColor: "#0891B2",
            prices: { "Casal": 55.00 },
            sizes: ["Casal"],
            image: "https://picsum.photos/seed/cmb4/800/800",
            gallery: ["https://picsum.photos/seed/cmb4/800/800"]
        }
    }
});

allProducts.push({
    id: 104,
    name: "Kit Cama Queen 4 Peças",
    category: "cama_mesa_banho",
    minQuantity: 30,
    description: "Kit completo queen com acabamento premium. Venda no atacado — mínimo 30 unidades.",
    variants: {
        queen: {
            colorLabel: "Queen",
            bgColor: "#0284C7",
            prices: { "Queen": 65.00 },
            sizes: ["Queen"],
            image: "https://picsum.photos/seed/cmb5/800/800",
            gallery: ["https://picsum.photos/seed/cmb5/800/800"]
        }
    }
});

allProducts.push({
    id: 105,
    name: "Toalha de Banho Premium",
    category: "cama_mesa_banho",
    minQuantity: 30,
    description: "Toalha de banho em algodão penteado, super macia. Atacado — mínimo 30 unidades.",
    variants: {
        banho: {
            colorLabel: "Banho",
            bgColor: "#0E7490",
            prices: { "Banho": 25.00 },
            sizes: ["Banho"],
            image: "https://picsum.photos/seed/cmb6/800/800",
            gallery: ["https://picsum.photos/seed/cmb6/800/800"]
        }
    }
});

// ========== CRIAÇÃO DO CARD ==========
function createProductCard(product, isPromo = false) {
    const firstColorKey = Object.keys(product.variants)[0];
    const firstVariant = product.variants[firstColorKey];
    
    const hasCompareAt = firstVariant.compareAt && firstVariant.compareAt > firstVariant.prices?.P;
    let discountPercentage = 0;
    if (hasCompareAt) discountPercentage = Math.round(((firstVariant.compareAt - firstVariant.prices.P) / firstVariant.compareAt) * 100);
    
    const colorDotsHTML = Object.keys(product.variants).map(color => {
        const v = product.variants[color];
        const bgColor = v.bgColor || '#ccc';
        const isActive = (color === firstColorKey) ? 'active' : '';
        return `<button class="vip-card__color ${isActive}" data-color="${color}" style="background-color: ${bgColor};" title="${v.colorLabel}"></button>`;
    }).join('');
    
    const availableSizes = firstVariant.sizes || ["Único"];
    const defaultSize = availableSizes[0];
    const defaultPrice = firstVariant.prices?.[defaultSize] || 35;
    const sizesHTML = availableSizes.map(size => {
        const isActive = (size === defaultSize) ? 'active' : '';
        return `<button class="vip-card__size ${isActive}" data-size="${size}">${size}</button>`;
    }).join('');
    
    let priceHTML = '';
    if (hasCompareAt) {
        priceHTML = `
            <div class="vip-card__pricing">
                <span class="vip-card__original-price">R$ ${firstVariant.compareAt.toFixed(2)}</span>
                <span class="vip-card__current-price">R$ ${defaultPrice.toFixed(2)}</span>
                <span class="vip-card__discount">-${discountPercentage}%</span>
            </div>
        `;
    } else {
        priceHTML = `<div class="vip-card__price">R$ ${defaultPrice.toFixed(2)}</div>`;
    }
    
    let gallery = firstVariant.gallery;
    if (!gallery || gallery.length === 0) gallery = [firstVariant.image];
    const showDots = gallery.length > 1;
    const imageIndicators = showDots ? gallery.map((_, idx) => `<span class="vip-card__dot" data-img-index="${idx}"></span>`).join('') : '';
    
    const minQtyBadge = product.minQuantity ? `<div class="vip-card__min-qty"><i class="fas fa-boxes"></i> Mín. ${product.minQuantity} un.</div>` : '';
    
    const card = document.createElement('div');
    card.className = 'vip-card';
    if (product.category === 'cama_mesa_banho') card.classList.add('vip-card--cmb');
    card.setAttribute('data-product-id', product.id);
    card.setAttribute('data-current-color', firstColorKey);
    card.setAttribute('data-current-size', defaultSize);
    
    card.innerHTML = `
        <div class="vip-card__media">
            ${hasCompareAt ? `<div class="vip-card__badge">-${discountPercentage}%</div>` : ''}
            ${minQtyBadge}
            <div class="vip-card__carousel">
                <div class="vip-card__track">
                    ${gallery.map(img => `<img src="${img}" alt="${product.name}" class="vip-card__img" loading="lazy">`).join('')}
                </div>
                ${showDots ? `<div class="vip-card__controls">${imageIndicators}</div>` : ''}
            </div>
        </div>
        <div class="vip-card__content">
            <h3 class="vip-card__title">${product.name}</h3>
            ${priceHTML}
            <div class="vip-card__colors">${colorDotsHTML}</div>
            <div class="vip-card__sizes">${sizesHTML}</div>
        </div>
    `;
    
    initVipCarousel(card, gallery);
    
    const sizeBtns = card.querySelectorAll('.vip-card__size');
    const priceElement = card.querySelector('.vip-card__price, .vip-card__current-price');
    
    function updatePriceForSize(size) {
        const currentColor = card.getAttribute('data-current-color');
        const variant = product.variants[currentColor];
        if (variant && variant.prices && variant.prices[size]) {
            const newPrice = variant.prices[size];
            if (priceElement) priceElement.textContent = `R$ ${newPrice.toFixed(2)}`;
        }
    }
    
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const newSize = btn.getAttribute('data-size');
            if (newSize === card.getAttribute('data-current-size')) return;
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            card.setAttribute('data-current-size', newSize);
            updatePriceForSize(newSize);
        });
    });
    
    const colorBtns = card.querySelectorAll('.vip-card__color');
    const track = card.querySelector('.vip-card__track');
    const controlsContainer = card.querySelector('.vip-card__controls');
    
    colorBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const newColor = btn.getAttribute('data-color');
            if (newColor === card.getAttribute('data-current-color')) return;
            const variant = product.variants[newColor];
            if (!variant) return;
            colorBtns.forEach(cb => cb.classList.remove('active'));
            btn.classList.add('active');
            card.setAttribute('data-current-color', newColor);
            
            let newGallery = variant.gallery;
            if (!newGallery || newGallery.length === 0) newGallery = [variant.image];
            if (track) {
                track.innerHTML = newGallery.map(img => `<img src="${img}" alt="${product.name}" class="vip-card__img" loading="lazy">`).join('');
                const showNewDots = newGallery.length > 1;
                if (controlsContainer) {
                    controlsContainer.innerHTML = showNewDots ? newGallery.map((_, idx) => `<span class="vip-card__dot" data-img-index="${idx}"></span>`).join('') : '';
                }
                initVipCarousel(card, newGallery);
            }
            
            const currentSize = card.getAttribute('data-current-size');
            const availableSizesNew = variant.sizes || ["Único"];
            let newActiveSize = currentSize;
            if (!availableSizesNew.includes(currentSize)) newActiveSize = availableSizesNew[0];
            card.setAttribute('data-current-size', newActiveSize);
            card.querySelectorAll('.vip-card__size').forEach(btnSize => {
                if (btnSize.getAttribute('data-size') === newActiveSize) btnSize.classList.add('active');
                else btnSize.classList.remove('active');
            });
            updatePriceForSize(newActiveSize);
        });
    });
    
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.vip-card__color') &&
            !e.target.closest('.vip-card__size') &&
            !e.target.closest('.vip-card__dot')) {
            const currentColor = card.getAttribute('data-current-color');
            if (window.showProductDetail) window.showProductDetail(Number(product.id), currentColor);
        }
    });
    
    return card;
}

function initVipCarousel(card, gallery) {
    const track = card.querySelector('.vip-card__track');
    const dots = card.querySelectorAll('.vip-card__dot');
    if (!track || gallery.length <= 1) return null;
    let currentIndex = 0;
    const update = (idx) => {
        currentIndex = idx;
        track.style.transform = `translateX(-${idx * 100}%)`;
        dots.forEach((dot, i) => {
            dot.style.backgroundColor = i === idx ? '#ffffff' : 'rgba(255,255,255,0.5)';
        });
    };
    dots.forEach((dot, idx) => {
        const newDot = dot.cloneNode(true);
        dot.parentNode.replaceChild(newDot, dot);
        newDot.addEventListener('click', (e) => { e.stopPropagation(); update(idx); });
    });
    update(0);
    return { update };
}

function populateAllGrades() {
    const featuredContainer = document.getElementById('featured-container');
    if (featuredContainer) {
        featuredContainer.innerHTML = '';
        allProducts.filter(p => p.category === 'featured').forEach(product => {
            featuredContainer.appendChild(createProductCard(product));
        });
    }
    
    const cmbContainer = document.getElementById('cmb-container');
    if (cmbContainer) {
        cmbContainer.innerHTML = '';
        allProducts.filter(p => p.category === 'cama_mesa_banho').forEach(product => {
            cmbContainer.appendChild(createProductCard(product));
        });
    }
}

function findProductById(productId) {
    const idNum = parseInt(productId);
    return allProducts.find(p => p.id === idNum) || null;
}

function initializeProducts() {
    populateAllGrades();
    if (window.updateCartCount) window.updateCartCount();
}

document.addEventListener('DOMContentLoaded', () => { setTimeout(initializeProducts, 100); });

window.populateAllGrades = populateAllGrades;
window.findProductById = findProductById;
window.allProducts = allProducts;
window.products = {
    featured: allProducts.filter(p => p.category === 'featured'),
    cama_mesa_banho: allProducts.filter(p => p.category === 'cama_mesa_banho')
};