/* =========================================================
   CONFIGURAÇÃO DA LOJA — Encanto do Lar
   Edite APENAS este arquivo para configurar sua loja.
   ========================================================= */
window.STORE_CONFIG = {
  name: "Encanto do Lar",
  domain: "encantodolar.shop",

  /* >>> IMPORTANTE: Configure seu WhatsApp no formato internacional <<<
     Exemplo: "5583999999999" (código do país + DDD + número)
     Enquanto estiver vazio, o site exibirá um aviso antes de finalizar. */
  whatsapp: "",

  /* Instagram (sem @). Deixe vazio se não tiver. */
  instagram: "",

  /* Mensagem da barra superior */
  promoMessage: "Seu lar mais bonito começa aqui ✨",

  /* Frete — configurável.
     Você pode definir uma tabela por cidade/estado. Ex.: {"São Bento|PB": 4.00} */
  shipping: {
    freeAbove: null,          // Ex.: 250 para frete grátis acima de R$ 250
    defaultMessage: "Frete a confirmar após informar o endereço."
  }
};