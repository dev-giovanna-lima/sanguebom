/* ==========================================================
   Componentização do Cabeçalho (menu) + CTA + Rodapé
   Fonte única de verdade para o header, a chamada "Já conferiu
   tudo?" e o footer do site. Injeta os três em qualquer página
   que carregue este script, ajustando os caminhos automaticamente
   conforme a página esteja na raiz (index.html) ou em /pages/.
   ========================================================== */
(function () {
  "use strict";

  // Detecta se a página atual está dentro da pasta /pages/.
  var inPages = /\/pages\//.test(window.location.pathname);

  // Prefixo até a raiz do projeto a partir da página atual.
  var root = inPages ? "../" : "";

  // Caminho até a pasta das subpáginas a partir da página atual.
  // Na home (raiz) é "pages/"; dentro de /pages/ é "" (mesma pasta).
  var pagesDir = inPages ? "" : "pages/";

  var logo = root + "assets/img/Logo.png";
  var coracao = root + "assets/img/Polygon 2.png";

  // Identifica a página atual para destacar o item de menu correspondente.
  var page = (function () {
    var p = decodeURIComponent(window.location.pathname).toLowerCase();
    if (/criterios/.test(p)) return "quem";
    if (/beneficios/.test(p)) return "beneficios";
    if (/hist[oó]ria/.test(p)) return "historias";
    if (/patrocinadores/.test(p)) return "patrocinio";
    return "inicio";
  })();

  // Itens do menu. Cada item leva à sua própria página; o destaque
  // (classe "start") vai para a página atual. Contato e Locais de
  // Doação ficam sem função por enquanto.
  var navItems = [
    { key: "inicio", href: root + "index.html", label: "Início" },
    { key: "quem", href: pagesDir + "criterios.html", label: "Quem Pode Doar" },
    { key: "beneficios", href: pagesDir + "beneficios.html", label: "Benefícios" },
    { key: "locais", href: "#", label: "Locais de Doação" },
    { key: "historias", href: pagesDir + "historia.html", label: "Histórias" },
    { key: "patrocinio", href: pagesDir + "patrocinadores.html", label: "Patrocinio" },
    { key: "contato", href: "#footer", label: "Contato" }
  ];

  var navHTML = navItems
    .map(function (it) {
      var cls = it.key === page ? ' class="start"' : "";
      return '<a href="' + it.href + '"' + cls + ">" + it.label + "</a>";
    })
    .join("");

  var headerHTML =
    '<header class="header">' +
    '  <div class="logo">' +
    '    <a href="' + root + 'index.html"><img src="' + logo + '" alt="Sangue Bom"></a>' +
    "  </div>" +
    '  <nav class="navbar">' +
    navHTML +
    "  </nav>" +
    '  <div class="Doar">' +
    '    <a href="#">' +
    '      <img src="' + coracao + '" alt="coração">' +
    "      <span>Quero Doar</span>" +
    "    </a>" +
    "  </div>" +
    "</header>";

  var footerHTML =
    '<footer class="footer" id="footer">' +
    '  <div class="footer__sobre">' +
    '    <img width="70" height="80" src="' + logo + '" alt="Sangue Bom">' +
    "    <p>Incentivar e facilitar a doação de sangue, conectando pessoas e salvando vidas.</p>" +
    "  </div>" +
    '  <nav class="footer__links">' +
    "    <h3>Links Rápidos</h3>" +
    "    <ul>" +
    '      <li><a href="' + pagesDir + 'criterios.html">Quem Pode Doar</a></li>' +
    '      <li><a href="' + pagesDir + 'beneficios.html">Benefícios</a></li>' +
    '      <li><a href="#">Locais de Doação</a></li>' +
    '      <li><a href="' + pagesDir + 'historia.html">Histórias que Inspiram</a></li>' +
    '      <li><a href="' + pagesDir + 'patrocinadores.html">Patrocínio</a></li>' +
    "    </ul>" +
    "  </nav>" +
    '  <nav class="footer__institucional">' +
    "    <h3>Institucional</h3>" +
    "    <ul>" +
    '      <li><a href="#">Política de Privacidade</a></li>' +
    '      <li><a href="#">Termos de Uso</a></li>' +
    '      <li><a href="#">Transparência</a></li>' +
    '      <li><a href="#footer">Contato</a></li>' +
    "    </ul>" +
    "  </nav>" +
    '  <div class="footer__contato">' +
    "    <h3>Fale Conosco</h3>" +
    "    <ul>" +
    "      <li>" +
    '        <img width="80" height="80" src="https://img.icons8.com/ios/100/whatsapp--v1.png" alt="WhatsApp">' +
    '        <a href="tel:+5511999999999">(11) 99999-9999</a>' +
    "      </li>" +
    "      <li>" +
    '        <img width="50" height="50" src="https://img.icons8.com/ios/70/new-post--v1.png" alt="E-mail">' +
    '        <a href="mailto:contato@sanguebom.org.br">contato@sanguebom.org.br</a>' +
    "      </li>" +
    "    </ul>" +
    '    <div class="footer__redes">' +
    '      <a href="https://facebook.com/sanguebom">' +
    '        <img width="50" height="50" src="https://img.icons8.com/ios/50/facebook--v1.png" alt="Facebook">' +
    "      </a>" +
    '      <a href="https://instagram.com/sanguebom">' +
    '        <img width="50" height="50" src="https://img.icons8.com/ios/50/instagram-new--v1.png" alt="Instagram">' +
    "      </a>" +
    "    </div>" +
    "  </div>" +
    '  <p class="footer__copyright">©2026 Sangue Bom. Todos os direitos reservados.</p>' +
    "</footer>";

  // Chamada "Já conferiu tudo?" — fica logo acima do rodapé.
  // O botão "Quero doar agora" segue sem função (#).
  var ctaHTML =
    '<section class="cta-doar">' +
    '  <div class="cta-doar__texto">' +
    "    <h2>Já conferiu tudo?</h2>" +
    "    <p>Se você atende aos critérios, doe sangue e ajude a salvar até 4 vidas.</p>" +
    "  </div>" +
    '  <a href="#" class="btn-doar">' +
    '    <img src="' + coracao + '" alt="Coração">' +
    "    Quero doar agora" +
    "  </a>" +
    "</section>";

  // Garante que o CSS do layout esteja carregado (caso a página
  // não tenha incluído o <link> estaticamente).
  function ensureLayoutCSS() {
    if (document.querySelector('link[data-layout-css]')) return;
    if (document.querySelector('link[href$="components/layout.css"]')) return;
    // O index carrega style.css, que já contém os estilos do header/footer/CTA.
    if (document.querySelector('link[href$="css/style.css"]')) return;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = root + "components/layout.css";
    link.setAttribute("data-layout-css", "");
    document.head.appendChild(link);
  }

  function nodeFrom(html) {
    var tmp = document.createElement("div");
    tmp.innerHTML = html.trim();
    return tmp.firstElementChild;
  }

  function mountHeader() {
    var slot = document.getElementById("site-header");
    if (slot) {
      slot.replaceWith(nodeFrom(headerHTML));
    } else {
      document.body.insertBefore(nodeFrom(headerHTML), document.body.firstChild);
    }
  }

  function mountCTA() {
    var slot = document.getElementById("site-cta");
    if (slot) {
      slot.replaceWith(nodeFrom(ctaHTML));
    } else {
      document.body.appendChild(nodeFrom(ctaHTML));
    }
  }

  function mountFooter() {
    var slot = document.getElementById("site-footer");
    if (slot) {
      slot.replaceWith(nodeFrom(footerHTML));
    } else {
      document.body.appendChild(nodeFrom(footerHTML));
    }
  }

  function init() {
    ensureLayoutCSS();
    mountHeader();
    mountCTA();
    mountFooter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
