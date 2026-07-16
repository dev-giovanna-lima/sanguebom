/* ==========================================================
   Locais de Doação — Google Maps
   Cria o mapa, os marcadores das unidades, liga a lista da
   esquerda ao mapa (clique na lista abre o marcador e vice-versa)
   e liga busca por endereço + geolocalização + filtro por tipo.
   Chamado pelo callback do script da Google Maps JavaScript API.

   Dados extraídos da lista oficial de postos de coleta da
   Secretaria de Estado da Saúde de SP — Capital, Grande São Paulo e
   Interior:
   https://saude.sp.gov.br/.../locais-para-doacao-de-sangue-no-estado
   Coordenadas são aproximadas por bairro/endereço/cidade (sem geocoding).
   ========================================================== */
(function () {
  "use strict";

  // Todas viram cartão na lista "Unidades próximas" (renderizarLista)
  // e marcador no mapa; o índice de cada uma é usado em data-unidade.
  var unidades = [
    {
      nome: "Hemocentro da Santa Casa de São Paulo",
      tipo: "Hemocentro",
      endereco: "Rua Marquês de Itu, 579 — Centro, São Paulo, SP",
      telefone: "(11) 2176-7258",
      horario: "Aberto até 18h (seg. a sex.)",
      lat: -23.5386,
      lng: -46.6427
    },
    {
      nome: "Hospital das Clínicas (Pró-Sangue)",
      tipo: "Hospital",
      endereco: "Av. Dr. Enéas de Carvalho Aguiar, 155 — Cerqueira César, São Paulo, SP",
      telefone: "0800-55-0300",
      horario: "Aberto até 18h",
      lat: -23.5558,
      lng: -46.6708
    },
    {
      nome: "Hemocentro Regional da Unifesp",
      tipo: "Hemocentro",
      endereco: "Rua Dr. Diogo de Faria, 824 — Vila Clementino, São Paulo, SP",
      telefone: "(11) 5576-4240",
      horario: "Aberto até 17h30",
      lat: -23.5978,
      lng: -46.6446
    },
    {
      nome: "Hospital Dante Pazzanese (Pró-Sangue)",
      tipo: "Hospital",
      endereco: "Av. Dante Pazzanese, 500 — Ibirapuera, São Paulo, SP",
      telefone: "0800-55-0300",
      horario: "Aberto até 16h30",
      lat: -23.5977,
      lng: -46.658
    },

    // Demais unidades da capital
    {
      nome: "Hospital do Servidor Público Municipal",
      tipo: "Hospital",
      endereco: "Rua Castro Alves, 60 — Aclimação, São Paulo, SP",
      telefone: "(11) 3277-5303",
      horario: "2ª a sáb., 8h/12h30",
      lat: -23.5757,
      lng: -46.6259
    },
    {
      nome: "Real e Benemérita Associação Portuguesa (Beneficência Portuguesa)",
      tipo: "Hospital",
      endereco: "Rua Maestro Cardim, 1041 — Bela Vista, São Paulo, SP",
      telefone: "(11) 3505-4800",
      horario: "2ª a 6ª, 8h/16h · sáb. 7h/14h",
      lat: -23.5613,
      lng: -46.6389
    },
    {
      nome: "Hospital Santa Catarina",
      tipo: "Hospital",
      endereco: "Av. Paulista, 200 — Bela Vista, São Paulo, SP",
      telefone: "(11) 3016-4111",
      horario: "2ª a 6ª, 8h/18h · sáb. 8h/15h30",
      lat: -23.5578,
      lng: -46.6427
    },
    {
      nome: "Hospital Sírio-Libanês",
      tipo: "Hospital",
      endereco: "Rua Dona Adma Jafet, 91 — Bela Vista, São Paulo, SP",
      telefone: "(11) 3394-5260",
      horario: "2ª a sáb., 7h/18h",
      lat: -23.5573,
      lng: -46.6539
    },
    {
      nome: "Hospital IGESP",
      tipo: "Hospital",
      endereco: "Rua Dr. Seng, 320 — Perdizes, São Paulo, SP",
      telefone: "(11) 3147-6330",
      horario: "2ª a 6ª, 8h/11h30 · sáb. 8h/16h30",
      lat: -23.548,
      lng: -46.662
    },
    {
      nome: "Hospital Municipal Dr. Fernando Mauro P. da Rocha",
      tipo: "Hospital",
      endereco: "Estrada Itapecerica, 1661 — Campo Limpo, São Paulo, SP",
      telefone: "(11) 5812-1379",
      horario: "2ª a sáb., 8h/13h",
      lat: -23.6339,
      lng: -46.7566
    },
    {
      nome: "Hospital Pérola Byington",
      tipo: "Hospital",
      endereco: "Av. Brigadeiro Luiz Antônio, 683 — Centro, São Paulo, SP",
      telefone: "(11) 3248-8111",
      horario: "2ª a 6ª, 7h/11h30",
      lat: -23.5595,
      lng: -46.6427
    },
    {
      nome: "Hospital 9 de Julho",
      tipo: "Hospital",
      endereco: "Rua Peixoto Gomide, 613 — Cerqueira César, São Paulo, SP",
      telefone: "(11) 3285-2922",
      horario: "2ª a 6ª, 8h/17h · sáb. 8h/12h",
      lat: -23.5624,
      lng: -46.6558
    },
    {
      nome: "Hospital Municipal Alípio Correa Neto",
      tipo: "Hospital",
      endereco: "Al. Rodrigo de Brum, 1989 — Ermelino Matarazzo, São Paulo, SP",
      telefone: "(11) 2545-4652",
      horario: "2ª a sáb., 8h/13h",
      lat: -23.4949,
      lng: -46.4726
    },
    {
      nome: "Hospital Santa Marcelina",
      tipo: "Hospital",
      endereco: "Rua Harry Danhenberg, 473 — Vila Camosina, São Paulo, SP",
      telefone: "(11) 2523-0546",
      horario: "2ª a 6ª, 7h/16h · sáb. 7h/12h",
      lat: -23.531,
      lng: -46.4685
    },
    {
      nome: "Hospital Municipal São Luiz Gonzaga",
      tipo: "Hospital",
      endereco: "Rua Michel Ouchana, 94 — Jaçanã, São Paulo, SP",
      telefone: "(11) 3466-1000",
      horario: "2ª a 6ª, 7h/15h30 · sáb. 7h/11h30",
      lat: -23.4547,
      lng: -46.5943
    },
    {
      nome: "Hospital A.C.Camargo",
      tipo: "Hospital",
      endereco: "Rua Prof. Antônio Prudente, 211 — Liberdade, São Paulo, SP",
      telefone: "(11) 2189-5122",
      horario: "2ª a sáb., 8h/17h",
      lat: -23.5613,
      lng: -46.6497
    },
    {
      nome: "Hospital Bandeirantes",
      tipo: "Hospital",
      endereco: "Rua Barão de Iguape, 212 — Liberdade, São Paulo, SP",
      telefone: "(11) 3660-6044",
      horario: "2ª a 6ª, 8h/17h",
      lat: -23.5645,
      lng: -46.6329
    },
    {
      nome: "Hospital Mandaqui",
      tipo: "Hospital",
      endereco: "Rua Voluntários da Pátria, 4.227 — Mandaqui, São Paulo, SP",
      telefone: "0800-55-0300",
      horario: "2ª a 6ª, 8h/16h30",
      lat: -23.478,
      lng: -46.628
    },
    {
      nome: "Hospital Israelita Albert Einstein — Morumbi",
      tipo: "Hospital",
      endereco: "Av. Albert Einstein, 627 — Morumbi, São Paulo, SP",
      telefone: "(11) 2151-0444",
      horario: "2ª a 6ª, 8h/21h · sáb. 8h/17h",
      lat: -23.5993,
      lng: -46.7161
    },
    {
      nome: "Hospital do Coração (HCor)",
      tipo: "Hospital",
      endereco: "Rua Abílio Soares, 176 — Paraíso, São Paulo, SP",
      telefone: "(11) 3053-6537",
      horario: "2ª a 6ª, 8h/17h",
      lat: -23.5738,
      lng: -46.6519
    },
    {
      nome: "Biotec Processamento do Sangue",
      tipo: "Banco de Sangue",
      endereco: "Rua Tavares Bastos, 425 — Vila Pompéia, São Paulo, SP",
      telefone: "(11) 3674-4451",
      horario: "2ª a 6ª, 8h/18h · sáb. 8h/16h",
      lat: -23.528,
      lng: -46.682
    },
    {
      nome: "Hospital Samaritano",
      tipo: "Hospital",
      endereco: "Rua Conselheiro Brotero, 1486 — Santa Cecília, São Paulo, SP",
      telefone: "(11) 3821-5852",
      horario: "2ª a 6ª, 8h/14h · sáb. 8h/13h",
      lat: -23.5346,
      lng: -46.6529
    },
    {
      nome: "São Camilo Santana",
      tipo: "Hospital",
      endereco: "Rua Voluntários da Pátria, 3997 — Santana, São Paulo, SP",
      telefone: "(11) 2972-8000",
      horario: "2ª a sáb., 8h/12h",
      lat: -23.5027,
      lng: -46.6252
    },
    {
      nome: "Banco de Sangue Paulista — Santo Amaro",
      tipo: "Banco de Sangue",
      endereco: "Rua Iguatinga, 382 — Santo Amaro, São Paulo, SP",
      telefone: "(11) 5521-4013",
      horario: "2ª a sáb., 8h/16h40",
      lat: -23.6531,
      lng: -46.708
    },
    {
      nome: "Hospital Municipal Dr. Carmino Caricchio",
      tipo: "Hospital",
      endereco: "Av. Celso Garcia, 4.815 — Tatuapé, São Paulo, SP",
      telefone: "(11) 2942-8094",
      horario: "2ª a sáb. (verifique dias)",
      lat: -23.5386,
      lng: -46.5769
    },
    {
      nome: "Hospital Prof. Edmundo Vasconcelos",
      tipo: "Hospital",
      endereco: "Rua Borges Lagoa, 1450 — Vila Clementino, São Paulo, SP",
      telefone: "(11) 5080-4435",
      horario: "2ª a sáb., 8h/17h",
      lat: -23.5978,
      lng: -46.6472
    },
    {
      nome: "Hospital do Servidor Público Estadual (IAMSPE)",
      tipo: "Hospital",
      endereco: "Rua Pedro de Toledo, 1800 — Vila Clementino, São Paulo, SP",
      telefone: "(11) 4573-8249",
      horario: "2ª a sáb., 8h/16h",
      lat: -23.5972,
      lng: -46.6423
    },
    {
      nome: "Hospital Israelita Albert Einstein — Vila Mariana",
      tipo: "Hospital",
      endereco: "Rua Madre Cabrini, 462 — Vila Mariana, São Paulo, SP",
      telefone: "(11) 2151-7083",
      horario: "2ª a 6ª, 8h/16h",
      lat: -23.5866,
      lng: -46.6398
    },
    {
      nome: "Banco de Sangue Paulista — Ed. Visionaire",
      tipo: "Banco de Sangue",
      endereco: "Rua Dr. Alceu de Campos Rodrigues, 46 — Vila Nova Conceição, São Paulo, SP",
      telefone: "(11) 3048-8969",
      horario: "2ª a sáb., 8h/16h40",
      lat: -23.5866,
      lng: -46.6693
    },
    {
      nome: "Hospital Santa Paula",
      tipo: "Hospital",
      endereco: "Av. Santo Amaro, 2.468 — Vila Olímpia, São Paulo, SP",
      telefone: "(11) 3660-5972",
      horario: "2ª a 6ª, 8h/17h",
      lat: -23.5966,
      lng: -46.6858
    }
  ];

  // Índice em que termina a capital dentro de `unidades` — usado para
  // limitar o enquadramento inicial do mapa (fitBounds) só à capital,
  // mesmo com Grande SP e Interior também na lista/marcadores.
  var FIM_CAPITAL = unidades.length;

  // Grande São Paulo (Barueri, Diadema, Guarulhos, Osasco, Santo André,
  // São Bernardo, São Caetano, Suzano) — mesma fonte oficial (SES-SP).
  unidades = unidades.concat([
    {
      nome: "Hospital Municipal Dr. Francisco Moran",
      tipo: "Hospital",
      endereco: "Rua Angela Mirella, 354 — Jardim Barueri, Barueri, SP",
      telefone: "0800-55-0300",
      horario: "2ª a 6ª, 8h/16h",
      lat: -23.5106,
      lng: -46.8763
    },
    {
      nome: "Hospital Estadual de Diadema",
      tipo: "Hospital",
      endereco: "Rua José Bonifácio, 1641 — Serraria, Diadema, SP",
      telefone: "(11) 3583-1475",
      horario: "2ª a 6ª, 7h/14h",
      lat: -23.6858,
      lng: -46.6191
    },
    {
      nome: "Hospital Carlos Chagas",
      tipo: "Hospital",
      endereco: "Rua Santo Antônio, 95 — Guarulhos, SP",
      telefone: "(11) 3660-6040",
      horario: "2ª a 6ª, 8h/17h · sáb. 8h/13h",
      lat: -23.4628,
      lng: -46.5333
    },
    {
      nome: "Hospital Stella Maris",
      tipo: "Hospital",
      endereco: "Rua Maria Cândida Pereira, 568 — Itapegica, Guarulhos, SP",
      telefone: "(11) 2423-8551",
      horario: "2ª a 6ª, 8h/16h",
      lat: -23.475,
      lng: -46.52
    },
    {
      nome: "Hospital Castelo Branco",
      tipo: "Hospital",
      endereco: "Rua Ari Barroso, 355 — Presidente Altino, Osasco, SP",
      telefone: "0800-55-0300",
      horario: "2ª a 6ª, 8h/16h30 · sáb. 8h/16h",
      lat: -23.5265,
      lng: -46.7614
    },
    {
      nome: "Hospital Estadual Mário Covas",
      tipo: "Hospital",
      endereco: "Rua Dr. Henrique Calderazzo, 321 — Paraíso, Santo André, SP",
      telefone: "(11) 2829-5162",
      horario: "2ª a sáb., 8h/13h",
      lat: -23.6639,
      lng: -46.5383
    },
    {
      nome: "Centro Hospitalar Santo André",
      tipo: "Hospital",
      endereco: "Av. João Ramalho, 326 — Vila Assunção, Santo André, SP",
      telefone: "(11) 4433-3718",
      horario: "2ª a sáb., 8h/13h",
      lat: -23.6689,
      lng: -46.5305
    },
    {
      nome: "Hemocentro Regional São Bernardo do Campo",
      tipo: "Hemocentro",
      endereco: "Rua Pedro Jacobucci, 440 — Jardim das Américas, São Bernardo do Campo, SP",
      telefone: "(11) 4332-3900",
      horario: "2ª a sáb., 8h/13h",
      lat: -23.6939,
      lng: -46.565
    },
    {
      nome: "Núcleo Regional de Hemoterapia Dr. Aguinaldo Quaresma",
      tipo: "Hemocentro",
      endereco: "Rua Peri, 361 — Osvaldo Cruz, São Caetano do Sul, SP",
      telefone: "(11) 4227-1083",
      horario: "2ª a sáb., 8h/12h",
      lat: -23.6229,
      lng: -46.5546
    },
    {
      nome: "Santa Casa Suzano",
      tipo: "Hospital",
      endereco: "Av. Antônio Marques Figueira, 1861 — Vila Figueira, Suzano, SP",
      telefone: "(11) 4752-9999",
      horario: "2ª a 6ª, 8h/14h",
      lat: -23.5425,
      lng: -46.3116
    },

    // Interior de São Paulo — mesma fonte oficial (SES-SP).
    {
      nome: "Banco de Sangue e Adamantina",
      tipo: "Banco de Sangue",
      endereco: "Rua Joaquim Luiz Vian, 209 — Vila Cicma, Adamantina, SP",
      telefone: "(18) 3502-2200",
      horario: "2ª a 6ª, 7h15/11h",
      lat: -21.6858,
      lng: -51.0736
    },
    {
      nome: "Hospital Municipal de Americana",
      tipo: "Hospital",
      endereco: "Avenida da Saúde, 415 — Jardim Nossa Senhora de Fátima, Americana, SP",
      telefone: "(19) 3468-1739",
      horario: "2ª a 6ª, 8h/11h30",
      lat: -22.7392,
      lng: -47.3312
    },
    {
      nome: "Irmandade de Misericórdia Hospital São Francisco",
      tipo: "Hospital",
      endereco: "Praça Francisco Matarazzo, 60 — Santa Catarina, Americana, SP",
      telefone: "(19) 3405-4370",
      horario: "3ª, 5ª e 6ª, 7h30/11h30",
      lat: -22.74,
      lng: -47.328
    },
    {
      nome: "Hemonúcleo de Araçatuba",
      tipo: "Hemocentro",
      endereco: "Av. Arthur Ferreira da Costa, 330 — Aviação, Araçatuba, SP",
      telefone: "(18) 2102-9400",
      horario: "2ª a 6ª, 8h/19h · sáb. 7h/12h",
      lat: -21.2089,
      lng: -50.4328
    },
    {
      nome: "Hemonúcleo de Araraquara",
      tipo: "Hemocentro",
      endereco: "Rua Expedicionários do Brasil, 1621 — Centro, Araraquara, SP",
      telefone: "(16) 3301-6102",
      horario: "2ª a 6ª, 7h/18h · sáb. 8h/12h",
      lat: -21.7845,
      lng: -48.1781
    },
    {
      nome: "Hemonúcleo de Assis",
      tipo: "Hemocentro",
      endereco: "Praça Dr. Symphronio Alves dos Santos, s/n — Centro, Assis, SP",
      telefone: "(18) 3302-6023",
      horario: "2ª a sáb., 7h/12h",
      lat: -22.6619,
      lng: -50.4117
    },
    {
      nome: "Hemonúcleo de Barretos",
      tipo: "Hemocentro",
      endereco: "Rua Antenor Duarte Vilella, 1331 — Dr. Paulo Prata, Barretos, SP",
      telefone: "(17) 3321-6600",
      horario: "2ª a 6ª, 7h/12h · sáb. e dom. 7h/11h",
      lat: -20.5572,
      lng: -48.5675
    },
    {
      nome: "Santa Casa de Batatais",
      tipo: "Hospital",
      endereco: "Rua Dr. Manoel Furtado, 235 — Centro, Batatais, SP",
      telefone: "(16) 3761-4004",
      horario: "2ª a 5ª, 7h/12h · 6ª 7h/11h",
      lat: -20.89,
      lng: -47.6208
    },
    {
      nome: "Hospital Estadual Bauru",
      tipo: "Hospital",
      endereco: "Av. Eng. Luis Edmundo Carrijo Coube, 1-100 — Bauru, SP",
      telefone: "(14) 3103-7777",
      horario: "Coleta só de plaquetas por aférese, com agendamento",
      lat: -22.3147,
      lng: -49.0606
    },
    {
      nome: "Hemonúcleo de Bauru",
      tipo: "Hemocentro",
      endereco: "Rua Monsenhor Claro, 8-88 — Centro, Bauru, SP",
      telefone: "(14) 3234-4412",
      horario: "2ª a 6ª, 7h/11h30 e 14h/16h",
      lat: -22.32,
      lng: -49.065
    },
    {
      nome: "Hospital Municipal Bebedouro",
      tipo: "Hospital",
      endereco: "Av. Raul Furquim, 2010 — Jd. Júlia, Bebedouro, SP",
      telefone: "(17) 3342-8817",
      horario: "3ª a sáb., 7h/12h",
      lat: -20.9486,
      lng: -48.4778
    },
    {
      nome: "Hemocentro de Botucatu (Unesp)",
      tipo: "Hemocentro",
      endereco: "Campus Unesp, Distrito de Rubião Júnior — Botucatu, SP",
      telefone: "(14) 3811-6041",
      horario: "2ª a 6ª, 7h30/16h30 · sáb. 7h/13h",
      lat: -22.8256,
      lng: -48.4451
    },
    {
      nome: "Centro de Hemoterapia Celular em Medicina de Campinas",
      tipo: "Banco de Sangue",
      endereco: "Rua Onze de Agosto, 415 — Centro, Campinas, SP",
      telefone: "(19) 3734-3193",
      horario: "2ª a 6ª, 7h30/12h30 · sáb. 8h/12h",
      lat: -22.9056,
      lng: -47.0608
    },
    {
      nome: "Hemocamp Clínica de Hemoterapia",
      tipo: "Banco de Sangue",
      endereco: "Rua Irmã Serafina, 259 — Centro, Campinas, SP",
      telefone: "(19) 3235-2259",
      horario: "2ª a 6ª, 8h/11h",
      lat: -22.903,
      lng: -47.058
    },
    {
      nome: "Hemocentro Campinas / Unicamp",
      tipo: "Hemocentro",
      endereco: "Rua Carlos Chagas, 480 — Cidade Universitária, Barão Geraldo, Campinas, SP",
      telefone: "0800-7228432",
      horario: "2ª a sáb. (incl. feriados), 7h30/15h",
      lat: -22.8219,
      lng: -47.0699
    },
    {
      nome: "Posto de Coleta Mário Gatti",
      tipo: "Hemocentro",
      endereco: "Av. Prefeito Faria Lima, 340 — Parque Itália, Campinas, SP",
      telefone: "(19) 3272-5501",
      horario: "2ª a sáb., 8h/15h",
      lat: -22.91,
      lng: -47.055
    },
    {
      nome: "Posto de Coleta Boldrini",
      tipo: "Hemocentro",
      endereco: "Av. Dr. Gabriel Porto, 1270 — Cidade Universitária, Campinas, SP",
      telefone: "(19) 3887-5028",
      horario: "2ª a 6ª, 8h/12h",
      lat: -22.822,
      lng: -47.068
    },
    {
      nome: "Hemonúcleo de Catanduva",
      tipo: "Hemocentro",
      endereco: "Rua 13 de Maio, 974 — Centro, Catanduva, SP",
      telefone: "(17) 3522-7722",
      horario: "4ª a domingo, 7h/13h",
      lat: -21.1377,
      lng: -48.9728
    },
    {
      nome: "Hospital Municipal de Cubatão",
      tipo: "Hospital",
      endereco: "Av. Henry Borden, s/n — Vila Santa Rosa, Cubatão, SP",
      telefone: "(13) 3362-5400",
      horario: "2ª a 6ª, 7h/14h",
      lat: -23.8947,
      lng: -46.4253
    },
    {
      nome: "Hemonúcleo de Fernandópolis",
      tipo: "Hemocentro",
      endereco: "Rua Simão dos Santos Gomes, 266 — Jardim Santista, Fernandópolis, SP",
      telefone: "(17) 3442-5544",
      horario: "2ª a 6ª, 7h30/18h30 · sáb. 8h/12h",
      lat: -20.2836,
      lng: -50.2467
    },
    {
      nome: "Hemonúcleo de Franca",
      tipo: "Hemocentro",
      endereco: "Av. Dr. Hélio Palermo, 4181 — Vila Santa Eugênia, Franca, SP",
      telefone: "(16) 3402-5000",
      horario: "2ª, 7h/19h · sáb. 7h/12h",
      lat: -20.5386,
      lng: -47.4008
    },
    {
      nome: "Hemonúcleo Regional de Jaú",
      tipo: "Hemocentro",
      endereco: "Rua Dona Silvéria, 150 — Chácara Braz Miraglia, Jaú, SP",
      telefone: "(14) 3602-1356",
      horario: "2ª a 6ª, 7h30/13h · sáb. 7h30/12h",
      lat: -22.2964,
      lng: -48.5578
    },
    {
      nome: "Bioclínica Jundiaí",
      tipo: "Banco de Sangue",
      endereco: "Rua Senador Fonseca, 1314 — Jundiaí, SP",
      telefone: "(11) 3379-3400",
      horario: "2ª a 6ª, 7h/11h",
      lat: -23.1857,
      lng: -46.8978
    },
    {
      nome: "Colsan Jundiaí",
      tipo: "Banco de Sangue",
      endereco: "Rua XV de Novembro, 1848 — Vila Municipal, Jundiaí, SP",
      telefone: "(11) 4521-4025",
      horario: "2ª a sáb., 7h30/12h30",
      lat: -23.18,
      lng: -46.895
    },
    {
      nome: "Santa Casa de Limeira",
      tipo: "Hospital",
      endereco: "Av. Antônio Ometto, 675 — Vila Claudia, Limeira, SP",
      telefone: "(19) 3446-6115",
      horario: "2ª a 6ª, 7h/14h · sáb. horário reduzido",
      lat: -22.5647,
      lng: -47.4017
    },
    {
      nome: "Santa Casa de Lins",
      tipo: "Hospital",
      endereco: "Rua Nove de Julho, s/n — Lins, SP",
      telefone: "(14) 3533-2500",
      horario: "2ª a 6ª, 8h/12h",
      lat: -21.6786,
      lng: -49.7425
    },
    {
      nome: "Hemocentro de Marília",
      tipo: "Hemocentro",
      endereco: "Rua Lourival Freire, 240 — Bairro Fragata, Marília, SP",
      telefone: "(14) 3402-1851",
      horario: "2ª a 6ª, 7h/18h · 5ª até 20h · sáb. 7h/12h",
      lat: -22.2139,
      lng: -49.9458
    },
    {
      nome: "Santa Casa de Mogi das Cruzes",
      tipo: "Hospital",
      endereco: "Rua Barão de Jaceguai, 1148 — Centro, Mogi das Cruzes, SP",
      telefone: "(11) 4799-2892",
      horario: "2ª a 6ª, 7h30/12h",
      lat: -23.5228,
      lng: -46.1883
    },
    {
      nome: "Santa Casa de Olímpia",
      tipo: "Hospital",
      endereco: "Rua Síria, 190 — Centro, Olímpia, SP",
      telefone: "(17) 3281-9080",
      horario: "3ª a sáb., 7h/12h",
      lat: -20.7364,
      lng: -48.9128
    },
    {
      nome: "Banco de Sangue de Ourinhos",
      tipo: "Banco de Sangue",
      endereco: "Rua Joaquim de Azevedo, 770 — Vila Moraes, Ourinhos, SP",
      telefone: "(14) 3302-2245",
      horario: "2ª a 6ª, 7h/18h30",
      lat: -22.9791,
      lng: -49.8697
    },
    {
      nome: "Hemonúcleo de Piracicaba",
      tipo: "Hemocentro",
      endereco: "Av. Independência, 953 — Centro, Piracicaba, SP",
      telefone: "(19) 3422-2019",
      horario: "2ª a 6ª, 7h30/13h30",
      lat: -22.7253,
      lng: -47.6492
    },
    {
      nome: "Hospital Regional de Presidente Prudente",
      tipo: "Hospital",
      endereco: "Rua José Bongiovani, 1297 — Cidade Universitária, Presidente Prudente, SP",
      telefone: "(18) 3229-1570",
      horario: "2ª a domingo, 7h/17h",
      lat: -22.1256,
      lng: -51.3889
    },
    {
      nome: "Hemonúcleo de Presidente Prudente",
      tipo: "Hemocentro",
      endereco: "Rua Wenceslau Braz, 05 — Vila Euclides, Presidente Prudente, SP",
      telefone: "(18) 3223-3511",
      horario: "2ª,3ª,4ª,6ª 7h/17h · 5ª 7h/19h · sáb. 7h/12h",
      lat: -22.12,
      lng: -51.385
    },
    {
      nome: "Banco de Sangue Ribeirão Preto",
      tipo: "Banco de Sangue",
      endereco: "Rua Quintino Bocaiúva, 895 — Vila Seixas, Ribeirão Preto, SP",
      telefone: "(16) 3610-1515",
      horario: "2ª,4ª,6ª 7h/14h · 3ª,5ª 7h/17h · sáb. 7h/12h",
      lat: -21.1775,
      lng: -47.8103
    },
    {
      nome: "São Francisco Hemoterapia",
      tipo: "Banco de Sangue",
      endereco: "Rua Quintino Bocaiúva, 248 — Higienópolis, Ribeirão Preto, SP",
      telefone: "(16) 2138-3298",
      horario: "2ª a 6ª, 7h/17h · sáb. e dom. 7h/11h",
      lat: -21.175,
      lng: -47.808
    },
    {
      nome: "Hemocentro Ribeirão Preto (Monte Alegre)",
      tipo: "Hemocentro",
      endereco: "Rua Tenente Catão Roxo, 2501 — Monte Alegre, Ribeirão Preto, SP",
      telefone: "(16) 2101-9300",
      horario: "2ª a domingo, 7h/13h",
      lat: -21.155,
      lng: -47.8208
    },
    {
      nome: "Hemocentro Ribeirão Preto (Centro)",
      tipo: "Hemocentro",
      endereco: "Rua Quintino Bocaiúva, 470 — Centro, Ribeirão Preto, SP",
      telefone: "(16) 3610-8929",
      horario: "2ª a 6ª, 7h/19h · dom. e feriados 7h/13h",
      lat: -21.177,
      lng: -47.809
    },
    {
      nome: "Hospital Ana Costa",
      tipo: "Hospital",
      endereco: "Rua Amazonas, 143 — Campo Grande, Santos, SP",
      telefone: "(13) 3202-9252",
      horario: "2ª a 6ª, 8h/14h",
      lat: -23.9608,
      lng: -46.3336
    },
    {
      nome: "Irmandade da Santa Casa de Misericórdia de Santos",
      tipo: "Hospital",
      endereco: "Rua Dr. Cláudio Luiz da Costa, 50 — Jabaquara, Santos, SP",
      telefone: "(13) 3206-0600",
      horario: "2ª a 6ª, 7h/16h · sáb. 7h/11h",
      lat: -23.955,
      lng: -46.33
    },
    {
      nome: "Núcleo de Hematologia e Hemoterapia de Santos",
      tipo: "Banco de Sangue",
      endereco: "Rua Oswaldo Cruz, 197 — Boqueirão, Santos, SP",
      telefone: "(13) 3233-2860",
      horario: "2ª a sáb., 8h/12h30",
      lat: -23.968,
      lng: -46.332
    },
    {
      nome: "Santa Casa de São Carlos",
      tipo: "Hospital",
      endereco: "Rua Paulino Botelho de Abreu Sampaio, 573 — Vila Pureza, São Carlos, SP",
      telefone: "(16) 3509-1230",
      horario: "2ª a sáb., 7h30/12h",
      lat: -22.0175,
      lng: -47.8908
    },
    {
      nome: "Beneficência Portuguesa SJRP",
      tipo: "Hospital",
      endereco: "Rua Luiz Vaz de Camões, 3236 — Redentora, São José do Rio Preto, SP",
      telefone: "(17) 3222-3145",
      horario: "2ª a 6ª, 8h/17h30 · sáb., dom. e feriados 7h/12h",
      lat: -20.8113,
      lng: -49.3758
    },
    {
      nome: "Hemocentro de São José do Rio Preto",
      tipo: "Hemocentro",
      endereco: "Av. Jamil Feres Kfuri, 80 — Jd. Panorama, São José do Rio Preto, SP",
      telefone: "(17) 3201-5151",
      horario: "2ª a domingo, 7h/13h",
      lat: -20.8,
      lng: -49.37
    },
    {
      nome: "Hemovalle",
      tipo: "Banco de Sangue",
      endereco: "Rua Santa Clara, 450 — Vila Adyanna, São José dos Campos, SP",
      telefone: "(12) 3922-0805",
      horario: "2ª a 6ª, 8h/11h30 · sáb. horário reduzido",
      lat: -23.1791,
      lng: -45.8872
    },
    {
      nome: "Serviço de Hemoterapia de São José dos Campos",
      tipo: "Hemocentro",
      endereco: "Rua Antônio Saes, 425 — Centro, São José dos Campos, SP",
      telefone: "(12) 3519-3766",
      horario: "2ª a 6ª, 7h/12h30",
      lat: -23.185,
      lng: -45.883
    },
    {
      nome: "Hospital São José — Santa Casa de São Vicente",
      tipo: "Hospital",
      endereco: "Rua Frei Gaspar, 790 — Centro, São Vicente, SP",
      telefone: "(13) 3569-6000",
      horario: "2ª a 6ª, 8h/12h",
      lat: -23.9631,
      lng: -46.3919
    },
    {
      nome: "Unidade do Hemocentro RP — Cidade Serrana",
      tipo: "Hemocentro",
      endereco: "Rua Nossa Senhora Dores, 741 — Centro, Serrana, SP",
      telefone: "(16) 3987-1626",
      horario: "2ª a sáb., 7h/12h",
      lat: -21.1936,
      lng: -47.5878
    },
    {
      nome: "Hemonúcleo Sorocaba — Colsan",
      tipo: "Hemocentro",
      endereco: "Rua Comendador Pereira Inácio, 564 — Lajeado, Sorocaba, SP",
      telefone: "(15) 3224-2930",
      horario: "2ª a sáb., 7h30/12h30",
      lat: -23.5015,
      lng: -47.4526
    },
    {
      nome: "Posto de Coleta Sumaré",
      tipo: "Hemocentro",
      endereco: "Av. da Amizade, 2400 — Jardim Bela Vista, Sumaré, SP",
      telefone: "(19) 3383-8909",
      horario: "2ª a sáb., 8h/12h",
      lat: -22.8219,
      lng: -47.2669
    },
    {
      nome: "Banco de Sangue Tatuí",
      tipo: "Banco de Sangue",
      endereco: "Rua Maneco Pereira, 299 — Centro, Tatuí, SP",
      telefone: "(15) 3305-8243",
      horario: "2ª a 6ª, 7h/9h",
      lat: -23.3553,
      lng: -47.8578
    },
    {
      nome: "Núcleo de Hemoterapia de Taubaté",
      tipo: "Hemocentro",
      endereco: "Rua Inglaterra, 190 — Jardim das Nações, Taubaté, SP",
      telefone: "(12) 3624-1273",
      horario: "2ª a 6ª, 8h/17h · sáb. 8h/12h",
      lat: -23.0264,
      lng: -45.5553
    },
    {
      nome: "Santa Casa de Tupã",
      tipo: "Hospital",
      endereco: "Rua Manoel Ferreira Damião, 426 — Tupã, SP",
      telefone: "(14) 3404-5555",
      horario: "2ª a 6ª, 7h30/12h",
      lat: -21.9347,
      lng: -50.5142
    }
  ]);

  // Ponto de referência padrão para a distância mostrada na lista
  // (Praça da Sé, centro de São Paulo) até que o usuário busque um
  // endereço ou use "Usar minha localização" — aí a lista é
  // reordenada a partir do ponto real.
  var REFERENCIA = { lat: -23.5505, lng: -46.6333 };

  var PIN_SVG =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 6.72 11.36 7.01 11.62a1.5 1.5 0 0 0 1.98 0C13.28 21.36 20 15.25 20 10c0-4.42-3.58-8-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/></svg>';
  var CHEVRON_SVG =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';

  function distanciaKm(a, b) {
    var R = 6371;
    var dLat = ((b.lat - a.lat) * Math.PI) / 180;
    var dLng = ((b.lng - a.lng) * Math.PI) / 180;
    var sa =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((a.lat * Math.PI) / 180) *
        Math.cos((b.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    return R * 2 * Math.atan2(Math.sqrt(sa), Math.sqrt(1 - sa));
  }

  // Estado atual da lista: de onde a distância é calculada, em que
  // ordem os índices aparecem e qual tipo está filtrado.
  var estado = {
    referencia: REFERENCIA,
    ordem: unidades.map(function (_, i) {
      return i;
    }),
    tipo: ""
  };

  function ordenarPorProximidade(pontoReferencia) {
    var indices = unidades.map(function (_, i) {
      return i;
    });
    indices.sort(function (a, b) {
      return distanciaKm(pontoReferencia, unidades[a]) - distanciaKm(pontoReferencia, unidades[b]);
    });
    return indices;
  }

  function construirCardsHTML(indices) {
    if (!indices.length) {
      return '<li class="locais-vazio">Nenhuma unidade encontrada para esse filtro.</li>';
    }

    return indices
      .map(function (indice) {
        var unidade = unidades[indice];
        var partes = unidade.endereco.split(" — ");
        var rua = partes[0] || unidade.endereco;
        var bairroCidade = partes[1] || "";
        var km = distanciaKm(estado.referencia, { lat: unidade.lat, lng: unidade.lng })
          .toFixed(1)
          .replace(".", ",");

        return (
          "<li>" +
          '<a href="#" data-unidade="' + indice + '">' +
          '<span class="locais-pin" aria-hidden="true">' + PIN_SVG + "</span>" +
          '<span class="locais-info">' +
          "<strong>" + unidade.nome + "</strong>" +
          '<span class="locais-endereco">' + rua + "<br />" + bairroCidade + "</span>" +
          '<span class="locais-meta">' + km + ' km <span aria-hidden="true">•</span> <span class="locais-status">' + unidade.horario + "</span></span>" +
          "</span>" +
          '<span class="locais-seta" aria-hidden="true">' + CHEVRON_SVG + "</span>" +
          "</a>" +
          "</li>"
        );
      })
      .join("");
  }

  // Monta os cartões de "Unidades próximas" a partir do estado atual
  // (ordem/ponto de referência/filtro). Preenche tanto a lista da
  // barra lateral (com rolagem) quanto o popup "Ver todas as unidades".
  function renderizarLista() {
    var indicesFiltrados = estado.tipo
      ? estado.ordem.filter(function (indice) {
          return unidades[indice].tipo === estado.tipo;
        })
      : estado.ordem;

    var html = construirCardsHTML(indicesFiltrados);

    var lista = document.getElementById("locais-lista-itens");
    if (lista) lista.innerHTML = html;

    var modalLista = document.getElementById("locais-modal-itens");
    if (modalLista) modalLista.innerHTML = html;
  }

  // Aplica um novo ponto de referência (busca ou geolocalização):
  // reordena a lista pelas unidades mais próximas dali e recentraliza
  // o mapa. Substitui o marcador azul de "ponto de referência" anterior.
  var marcadorReferencia = null;

  function aplicarPontoReferencia(pontoReferencia, tituloMarcador) {
    estado.referencia = pontoReferencia;
    estado.ordem = ordenarPorProximidade(pontoReferencia);
    renderizarLista();

    if (!map) return;

    map.panTo(pontoReferencia);
    map.setZoom(14);

    if (marcadorReferencia) {
      marcadorReferencia.setMap(null);
    }
    marcadorReferencia = new google.maps.Marker({
      position: pontoReferencia,
      map: map,
      title: tituloMarcador,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#1a73e8",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2
      }
    });
  }

  var map;
  var infoWindow;
  var geocoder;
  var markers = [];

  var pinIcon = {
    path: "M12 2C7.58 2 4 5.58 4 10c0 5.25 6.72 11.36 7.01 11.62a1.5 1.5 0 0 0 1.98 0C13.28 21.36 20 15.25 20 10c0-4.42-3.58-8-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z",
    fillColor: "#e11f26",
    fillOpacity: 1,
    strokeWeight: 0,
    scale: 1.7,
    anchor: null // preenchido depois que google.maps.Point existir
  };

  // Some/mostra os pins no mapa de acordo com o filtro de tipo atual
  // (mesma lógica de estado.tipo usada na lista).
  function atualizarMarcadoresVisiveis() {
    if (!map) return;
    markers.forEach(function (marker, indice) {
      var visivel = !estado.tipo || unidades[indice].tipo === estado.tipo;
      marker.setMap(visivel ? map : null);
    });
  }

  function abrirInfo(marker, unidade) {
    infoWindow.setContent(
      '<div style="font-family:\'MuseoModerno\',sans-serif;max-width:230px;">' +
        "<strong>" + unidade.nome + "</strong><br>" +
        '<span style="font-size:0.85rem;color:#595e68;">' + unidade.endereco + "</span><br>" +
        '<span style="font-size:0.8rem;color:#1f8a4c;">' + unidade.horario + "</span><br>" +
        '<a href="tel:' + unidade.telefone.replace(/[^\d+]/g, "") + '" style="font-size:0.8rem;color:#e11f26;">' + unidade.telefone + "</a>" +
      "</div>"
    );
    infoWindow.open(map, marker);
  }

  // Delegação de evento: funciona mesmo depois da lista ser
  // reconstruída (busca, geolocalização, filtro trocam o innerHTML).
  // Usada tanto na lista da lateral quanto no popup "Ver todas".
  function ligarCliquesDaLista(containerId, aoClicar) {
    var container = document.getElementById(containerId);
    if (!container) return;

    container.addEventListener("click", function (e) {
      var link = e.target.closest("[data-unidade]");
      if (!link) return;
      e.preventDefault();
      var indice = Number(link.getAttribute("data-unidade"));
      var marker = markers[indice];
      var unidade = unidades[indice];
      if (!marker) return;
      map.panTo(marker.getPosition());
      map.setZoom(15);
      abrirInfo(marker, unidade);
      if (aoClicar) aoClicar();
    });
  }

  // Abre/fecha o popup "Ver todas as unidades".
  function ligarModal() {
    var botaoAbrir = document.getElementById("locais-ver-todas");
    var modal = document.getElementById("locais-modal");
    var botaoFechar = document.getElementById("locais-modal-fechar");
    if (!botaoAbrir || !modal) return;

    function abrirModal(e) {
      if (e) e.preventDefault();
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function fecharModal() {
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    botaoAbrir.addEventListener("click", abrirModal);
    if (botaoFechar) botaoFechar.addEventListener("click", fecharModal);

    modal.addEventListener("click", function (e) {
      if (e.target === modal) fecharModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-open")) fecharModal();
    });

    // Clicar numa unidade dentro do popup também fecha ele.
    ligarCliquesDaLista("locais-modal-itens", fecharModal);
  }

  function ligarGeolocalizacao() {
    var botao = document.querySelector(".locais-geo");
    if (!botao || !navigator.geolocation) return;

    botao.addEventListener("click", function () {
      if (!map) return;
      navigator.geolocation.getCurrentPosition(
        function (posicao) {
          var local = { lat: posicao.coords.latitude, lng: posicao.coords.longitude };
          aplicarPontoReferencia(local, "Você está aqui");
        },
        function () {
          alert("Não foi possível obter sua localização. Verifique a permissão do navegador.");
        }
      );
    });
  }

  // Busca por bairro/cidade/CEP: geocodifica o texto (via Geocoding
  // API) e usa o resultado como novo ponto de referência da lista.
  function ligarBusca() {
    var form = document.getElementById("locais-busca-form");
    var input = document.getElementById("locais-busca-input");
    if (!form || !input) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var texto = input.value.trim();
      if (!texto) return;

      if (!map || !geocoder) {
        alert("O mapa ainda está carregando, tente novamente em instantes.");
        return;
      }

      geocoder.geocode({ address: texto + ", São Paulo, SP, Brasil" }, function (resultados, status) {
        if (status !== "OK" || !resultados || !resultados[0]) {
          alert("Não foi possível encontrar esse endereço. Tente um bairro, cidade ou CEP diferente.");
          return;
        }
        var local = resultados[0].geometry.location;
        aplicarPontoReferencia({ lat: local.lat(), lng: local.lng() }, "Local buscado: " + texto);
      });
    });
  }

  // Filtro "Todas as unidades / Hemocentros / Hospitais / Bancos de Sangue"
  // — dropdown customizado (sem <select> nativo) pra combinar com o
  // resto do site.
  function ligarFiltro() {
    var wrapper = document.getElementById("locais-filtro");
    var botao = document.getElementById("locais-filtro-botao");
    var label = document.getElementById("locais-filtro-label");
    var lista = document.getElementById("locais-filtro-lista");
    if (!wrapper || !botao || !label || !lista) return;

    function fechar() {
      lista.hidden = true;
      wrapper.setAttribute("data-aberto", "false");
      botao.setAttribute("aria-expanded", "false");
    }

    function abrir() {
      lista.hidden = false;
      wrapper.setAttribute("data-aberto", "true");
      botao.setAttribute("aria-expanded", "true");
    }

    botao.addEventListener("click", function (e) {
      e.stopPropagation();
      if (lista.hidden) abrir();
      else fechar();
    });

    lista.addEventListener("click", function (e) {
      var item = e.target.closest("[data-valor]");
      if (!item) return;

      label.textContent = item.textContent;
      lista.querySelectorAll("[role='option']").forEach(function (li) {
        var selecionado = li === item;
        li.setAttribute("aria-selected", selecionado ? "true" : "false");
        li.classList.toggle("is-selected", selecionado);
      });

      estado.tipo = item.getAttribute("data-valor");
      renderizarLista();
      atualizarMarcadoresVisiveis();
      fechar();
    });

    document.addEventListener("click", function (e) {
      if (!wrapper.contains(e.target)) fechar();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") fechar();
    });
  }

  // Exposta globalmente: é o callback usado pelo <script> da Google Maps API.
  window.initLocaisMap = function () {
    pinIcon.anchor = new google.maps.Point(12, 22);

    map = new google.maps.Map(document.getElementById("locais-map"), {
      center: { lat: -23.5578, lng: -46.6647 },
      zoom: 12,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false
    });

    infoWindow = new google.maps.InfoWindow();
    geocoder = new google.maps.Geocoder();

    var limites = new google.maps.LatLngBounds();

    unidades.forEach(function (unidade, indice) {
      var posicao = { lat: unidade.lat, lng: unidade.lng };
      var marker = new google.maps.Marker({
        position: posicao,
        map: map,
        title: unidade.nome,
        icon: pinIcon
      });
      marker.addListener("click", function () {
        abrirInfo(marker, unidade);
      });
      markers.push(marker);
      // Enquadramento inicial considera só a capital — Grande SP e
      // Interior ficam nos marcadores/lista, mas não abrem o mapa
      // inteiro do estado já na primeira visita.
      if (indice < FIM_CAPITAL) limites.extend(posicao);
    });

    map.fitBounds(limites, 40);

    ligarCliquesDaLista("locais-lista-itens");
    ligarBusca();
  };

  renderizarLista();
  ligarGeolocalizacao();
  ligarFiltro();
  ligarModal();
})();
