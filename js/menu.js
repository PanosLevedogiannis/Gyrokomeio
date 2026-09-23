/*
  Μενού / Menu
  ------------------------------------------------------------------
  Taken from the shop's printed menu. No prices, on purpose.
  Each item: { el, en, del, den, tags }
    el / en    name in Greek / English
    del / den  what's in it (optional)
    tags       any of: 'veg' (vegetarian), 'home' (made in house),
               'share' (for groups), 'house' (house special)
  Double-check the 'veg' tags with the kitchen before going live.
*/
window.MENU = [
  {
    id: 'wraps',
    el: 'Πίτες τυλιχτές', en: 'Pita wraps',
    note: {
      el: 'Διάλεξε πίτα: παραδοσιακή, καλαμποκιού ή ολικής άλεσης.',
      en: 'Pick your pita: traditional, corn or whole wheat.'
    },
    items: [
      { el: 'Πίτα με γύρο χοιρινό', en: 'Pork gyros pita', del: 'τζατζίκι, κρεμμύδι, ντομάτα, πατάτες', den: 'tzatziki, onion, tomato, fries' },
      { el: 'Πίτα με γύρο κοτόπουλο', en: 'Chicken gyros pita', del: 'μαγιονέζα, μαρούλι, ντομάτα, πατάτες', den: 'mayonnaise, lettuce, tomato, fries' },
      { el: 'Πίτα με κεμπάπ', en: 'Kebab pita', del: 'γιαούρτι, ντομάτα, πατάτες', den: 'yogurt, tomato, fries' },
      { el: 'Πίτα με σουβλάκι χοιρινό', en: 'Pork souvlaki pita', del: 'τζατζίκι, κρεμμύδι, ντομάτα, πατάτες', den: 'tzatziki, onion, tomato, fries' },
      { el: 'Πίτα με σουβλάκι κοτόπουλο', en: 'Chicken souvlaki pita', del: 'μαγιονέζα, μαρούλι, ντομάτα, πατάτες', den: 'mayonnaise, lettuce, tomato, fries' },
      { el: 'Πίτα με λουκάνικο', en: 'Sausage pita', del: 'πατάτες, κέτσαπ, μουστάρδα', den: 'fries, ketchup, mustard' },
      { el: 'Πίτα με μπιφτεκάκι', en: 'Bifteki pita', del: 'ντομάτα, πατάτες, τυροσαλάτα', den: 'tomato, fries, cheese dip' },
      { el: 'Σκεπαστή με γύρο χοιρινό', en: 'Skepasti (covered pita), pork gyros', del: 'τζατζίκι, κρεμμύδι, πατάτες, ντομάτα, γκούντα', den: 'tzatziki, onion, fries, tomato, gouda', tags: ['house'] },
      { el: 'Σκεπαστή με γύρο κοτόπουλο', en: 'Skepasti (covered pita), chicken gyros', del: 'μαρούλι, μαγιονέζα, ντομάτα, πατάτες, γκούντα', den: 'lettuce, mayonnaise, tomato, fries, gouda', tags: ['house'] }
    ]
  },
  {
    id: 'plates',
    el: 'Μερίδες', en: 'Plates',
    items: [
      { el: 'Γύρος χοιρινός', en: 'Pork gyros' },
      { el: 'Γύρος κοτόπουλο', en: 'Chicken gyros' },
      { el: 'Γύρος ανάμεικτος', en: 'Mixed gyros' },
      { el: 'Κεμπάπ', en: 'Kebab' },
      { el: 'Σουβλάκι χοιρινό', en: 'Pork souvlaki' },
      { el: 'Σουβλάκι κοτόπουλο', en: 'Chicken souvlaki' },
      { el: 'Σουβλάκι προβατίνα', en: 'Mutton souvlaki' },
      { el: 'Κοτομπουκιές', en: 'Chicken bites' }
    ]
  },
  {
    id: 'skewers',
    el: 'Καλαμάκια', en: 'Skewers',
    note: { el: 'Ανά τεμάχιο.', en: 'Per piece.' },
    items: [
      { el: 'Καλαμάκι χοιρινό', en: 'Pork skewer', del: 'χειροποίητο, 110 γρ.', den: 'handmade, 110 g', tags: ['home'] },
      { el: 'Καλαμάκι κοτόπουλο', en: 'Chicken skewer', del: 'χειροποίητο, 110 γρ.', den: 'handmade, 110 g', tags: ['home'] },
      { el: 'Καλαμάκι κεμπάπ', en: 'Kebab skewer' },
      { el: 'Καλαμάκι μπιφτεκάκι', en: 'Bifteki skewer' },
      { el: 'Καλαμάκι λουκάνικο', en: 'Sausage skewer' },
      { el: 'Καλαμάκι προβατίνα', en: 'Mutton skewer' }
    ]
  },
  {
    id: 'grill',
    el: 'Της σχάρας', en: 'From the grill',
    items: [
      { el: 'Πανσετάκια', en: 'Pancetta bites', del: 'μερίδα', den: 'portion' },
      { el: 'Κοτόπουλο σχάρας', en: 'Grilled chicken', del: 'ολόκληρο ή μισό', den: 'whole or half' },
      { el: 'Μπιφτέκι μοσχαρίσιο', en: 'Beef bifteki', del: '100% μοσχάρι', den: '100% beef' },
      { el: 'Μπιφτέκι γεμιστό', en: 'Stuffed beef bifteki', del: '100% μοσχάρι με φέτα, γκούντα, πιπεριά, ντομάτα', den: '100% beef with feta, gouda, pepper, tomato' },
      { el: 'Ψαρονέφρι', en: 'Pork tenderloin' },
      { el: 'Μοσχαρίσια μπριζόλα', en: 'Beef steak', del: 'με πατάτες και ντομάτα', den: 'with fries and tomato' },
      { el: 'Χοιρινή μπριζόλα', en: 'Pork chop', del: 'με πατάτες και ντομάτα', den: 'with fries and tomato' },
      { el: 'Tomahawk μπριζόλα', en: 'Tomahawk steak' },
      { el: 'Κοτόπουλο φιλέτο', en: 'Chicken fillet' },
      { el: 'Προβατίνα στα κάρβουνα', en: 'Charcoal-grilled mutton', del: 'χοντρή κοπή, το κιλό', den: 'thick cut, by the kilo', tags: ['share'] }
    ]
  },
  {
    id: 'specialties',
    el: 'Σπεσιαλιτέ', en: 'Specialties',
    items: [
      { el: 'Ρολό πανσέτα', en: 'Pancetta roll' },
      { el: 'Εξοχικό', en: 'Exochiko' },
      { el: 'Κοντοσούβλι χοιρινό', en: 'Pork kontosouvli' },
      { el: 'Κοτόπουλο κοντοσούβλι', en: 'Chicken kontosouvli' },
      { el: 'Κοκορέτσι', en: 'Kokoretsi' },
      { el: 'Κοτόπουλο', en: 'Chicken', del: 'ολόκληρο ή μισό', den: 'whole or half' }
    ]
  },
  {
    id: 'platters',
    el: 'Ποικιλίες', en: 'Platters',
    items: [
      { el: 'Ποικιλία', en: 'Mixed platter', del: 'γύρος κοτόπουλο, γύρος χοιρινό, λουκάνικο, κεμπάπ, τυροσαλάτα, τζατζίκι, πατάτες, πίτες', den: 'chicken gyros, pork gyros, sausage, kebab, cheese dip, tzatziki, fries, pitas', tags: ['share'] },
      { el: 'Ποικιλία μεγάλη', en: 'Large mixed platter', del: 'όλα τα παραπάνω και πανσέτα', den: 'all of the above plus pancetta', tags: ['share'] },
      { el: 'Mix Grill', en: 'Mix Grill', del: 'μπιφτέκι, καλαμάκι χοιρινό, καλαμάκι κοτόπουλο, καλαμάκι προβατίνα, κεμπάπ, λουκάνικο, πανσέτα, πατάτες, τυροκαυτερή, τυροσαλάτα, πίτες', den: 'bifteki, pork, chicken and mutton skewers, kebab, sausage, pancetta, fries, spicy cheese dip, cheese dip, pitas', tags: ['share', 'house'] }
    ]
  },
  {
    id: 'burgers',
    el: 'Burgers', en: 'Burgers',
    items: [
      { el: 'Classic burger', en: 'Classic burger', del: 'μπιφτέκι, γκούντα, κέτσαπ, μουστάρδα', den: 'beef patty, gouda, ketchup, mustard' },
      { el: 'Special burger', en: 'Special burger', del: 'μπιφτέκι, μπέικον, παρμεζάνα, ντομάτα, μαγιονέζα, μαρούλι, πατάτες', den: 'beef patty, bacon, parmesan, tomato, mayonnaise, lettuce, fries' },
      { el: 'Gyroκομείο burger', en: 'Gyrokomeio burger', del: 'δύο μπιφτέκια, μπέικον, γκούντα, κρεμμύδι, μαρούλι, ντομάτα, πατάτες, σως', den: 'two beef patties, bacon, gouda, onion, lettuce, tomato, fries, sauce', tags: ['house'] }
    ]
  },
  {
    id: 'sandwiches',
    el: 'Σάντουιτς', en: 'Sandwiches',
    items: [
      { el: 'Γύρος χοιρινός', en: 'Pork gyros', del: 'γκούντα, ντομάτα, κρεμμύδι, τζατζίκι, πατάτες', den: 'gouda, tomato, onion, tzatziki, fries' },
      { el: 'Γύρος κοτόπουλο', en: 'Chicken gyros', del: 'γκούντα, ντομάτα, μαρούλι, μαγιονέζα, πατάτες', den: 'gouda, tomato, lettuce, mayonnaise, fries' },
      { el: 'Κεμπάπ (2 τεμ.)', en: 'Kebab (2 pcs)', del: 'γκούντα, ντομάτα, γιαούρτι, πατάτες', den: 'gouda, tomato, yogurt, fries' },
      { el: 'Καλαμάκι χοιρινό (2 τεμ.)', en: 'Pork skewers (2 pcs)', del: 'γκούντα, ντομάτα, κρεμμύδι, τζατζίκι, πατάτες', den: 'gouda, tomato, onion, tzatziki, fries' },
      { el: 'Καλαμάκι κοτόπουλο (2 τεμ.)', en: 'Chicken skewers (2 pcs)', del: 'γκούντα, ντομάτα, μαρούλι, μαγιονέζα, πατάτες', den: 'gouda, tomato, lettuce, mayonnaise, fries' },
      { el: 'Μπιφτεκάκι (2 τεμ.)', en: 'Bifteki (2 pcs)', del: 'γκούντα, ντομάτα, πατάτες, τυροσαλάτα', den: 'gouda, tomato, fries, cheese dip' },
      { el: 'Λουκάνικο', en: 'Sausage', del: 'γκούντα, κέτσαπ, μουστάρδα, πατάτες', den: 'gouda, ketchup, mustard, fries' },
      { el: 'Κλαμπ σάντουιτς', en: 'Club sandwich', del: 'ζαμπόν, τυρί, μπέικον, μαρούλι, ντομάτα, πατάτες, μαγιονέζα', den: 'ham, cheese, bacon, lettuce, tomato, fries, mayonnaise' },
      { el: 'Τοστ ζαμπόν και τυρί', en: 'Ham and cheese toastie' },
      { el: 'Κολοκυθοκεφτές', en: 'Zucchini fritter', del: 'γκούντα, ντομάτα, πατάτες, μαρούλι', den: 'gouda, tomato, fries, lettuce', tags: ['veg'] },
      { el: 'Μπιφτέκι λαχανικών', en: 'Veggie burger', del: 'γκούντα, ντομάτα, πατάτες, μαρούλι, κέτσαπ', den: 'gouda, tomato, fries, lettuce, ketchup', tags: ['veg'] }
    ]
  },
  {
    id: 'starters',
    el: 'Ορεκτικά', en: 'Starters',
    note: {
      el: 'Τα ορεκτικά τα φτιάχνουμε εμείς, κάθε μέρα. Οι πατάτες καθαρίζονται φρέσκιες στο μαγαζί.',
      en: 'We make our starters in house every day. Potatoes are peeled fresh in the shop.'
    },
    items: [
      { el: 'Πατάτες τηγανητές', en: 'Fries', del: 'φρέσκιες, καθαρισμένες στο μαγαζί', den: 'fresh potatoes, peeled in the shop', tags: ['veg'] },
      { el: 'Πατάτες με τυρί ή σως', en: 'Fries with cheese or sauce' },
      { el: 'Πατάτες με τυρί και σως', en: 'Fries with cheese and sauce' },
      { el: 'Τζατζίκι', en: 'Tzatziki', tags: ['home', 'veg'] },
      { el: 'Τυροκαυτερή', en: 'Tirokafteri', den: 'spicy cheese dip', tags: ['home', 'veg'] },
      { el: 'Τυροσαλάτα', en: 'Tirosalata', den: 'creamy cheese dip', tags: ['home', 'veg'] },
      { el: 'Λουκάνικο', en: 'Sausage', tags: ['home'] },
      { el: 'Κολοκυθοκεφτέδες', en: 'Zucchini fritters', tags: ['veg'] },
      { el: 'Τυροπιτάρι με φέτα', en: 'Feta cheese pie', tags: ['home', 'veg'] },
      { el: 'Μπουρεκάκια', en: 'Bourekakia', del: 'ζαμπόν και τυρί', den: 'mini pies with ham and cheese' },
      { el: 'Πιπεριές ψητές γεμιστές', en: 'Grilled stuffed peppers' },
      { el: 'Ψωμί', en: 'Bread' },
      { el: 'Πίτα', en: 'Pita bread' }
    ]
  },
  {
    id: 'cheese',
    el: 'Τυριά', en: 'Cheese',
    items: [
      { el: 'Φέτα ΠΟΠ', en: 'Feta (PDO)', tags: ['veg'] },
      { el: 'Φέτα ψητή', en: 'Grilled feta', tags: ['veg'] },
      { el: 'Γραβιέρα', en: 'Graviera', den: 'Greek hard cheese', tags: ['veg'] },
      { el: 'Σαγανάκι', en: 'Saganaki', den: 'pan-fried cheese', tags: ['veg'] }
    ]
  },
  {
    id: 'salads',
    el: 'Σαλάτες', en: 'Salads',
    note: {
      el: 'Με παρθένο ελαιόλαδο από ντόπια παραγωγή.',
      en: 'Dressed with local extra virgin olive oil.'
    },
    items: [
      { el: 'Χωριάτικη', en: 'Greek salad', tags: ['veg'] },
      { el: 'Χωριάτικη χωρίς φέτα', en: 'Greek salad without feta', tags: ['veg'] },
      { el: 'Ντάκος', en: 'Dakos', del: 'κρητικό παξιμάδι, φέτα, ντομάτα, κάπαρη, ελαιόλαδο, ρίγανη', den: 'Cretan rusk, feta, tomato, capers, olive oil, oregano', tags: ['veg'] },
      { el: 'Αγγουροντομάτα', en: 'Tomato and cucumber', tags: ['veg'] },
      { el: 'Μαρούλι', en: 'Lettuce salad', tags: ['veg'] },
      { el: 'Λάχανο', en: 'Cabbage salad', tags: ['veg'] },
      { el: 'Χόρτα εποχής', en: 'Seasonal greens', tags: ['veg'] },
      { el: 'Ανάμεικτη', en: 'Mixed salad', del: 'μαρούλι, λάχανο, καρότο, ντομάτα, αγγούρι, πιπεριά, κρεμμύδι', den: 'lettuce, cabbage, carrot, tomato, cucumber, pepper, onion', tags: ['veg'] },
      { el: 'Καίσαρα', en: 'Caesar', del: 'μαρούλι, αγγούρι, κοτόπουλο, μπέικον, κρουτόν, σως καίσαρα', den: 'lettuce, cucumber, chicken, bacon, croutons, Caesar dressing' },
      { el: 'Πράσινη με κοτόπουλο', en: 'Green salad with chicken', del: 'μαρούλι, καλαμπόκι, κοτόπουλο, κρουτόν, παρμεζάνα, βινεγκρέτ, σως μελιού', den: 'lettuce, corn, chicken, croutons, parmesan, vinaigrette, honey dressing' },
      { el: 'Σεφ', en: 'Chef’s salad', del: 'μαρούλι, ντομάτα, αγγούρι, αυγό, ζαμπόν, ένταμ, σως σεφ', den: 'lettuce, tomato, cucumber, egg, ham, edam, chef’s dressing' },
      { el: 'Μπέικον', en: 'Bacon salad', del: 'μαρούλι, κρουτόν, παρμεζάνα, μπέικον, ντομάτα, σως μελιού, βινεγκρέτ', den: 'lettuce, croutons, parmesan, bacon, tomato, honey dressing, vinaigrette' }
    ]
  },
  {
    id: 'extras',
    el: 'Έξτρα', en: 'Extras',
    compact: true,
    note: { el: 'Πρόσθεσε σε πίτα, σάντουιτς ή μερίδα.', en: 'Add to any pita, sandwich or plate.' },
    items: [
      { el: 'Πατάτες', en: 'Fries' }, { el: 'Μαρούλι', en: 'Lettuce' }, { el: 'Πιπεριά', en: 'Pepper' },
      { el: 'Αγγούρι', en: 'Cucumber' }, { el: 'Λάχανο', en: 'Cabbage' }, { el: 'Αυγό', en: 'Egg' },
      { el: 'Φέτα', en: 'Feta' }, { el: 'Γκούντα', en: 'Gouda' }, { el: 'Ζαμπόν', en: 'Ham' },
      { el: 'Μπέικον', en: 'Bacon' }, { el: 'Τζατζίκι', en: 'Tzatziki' }, { el: 'Τυροσαλάτα', en: 'Cheese dip' },
      { el: 'Τυροκαυτερή', en: 'Spicy cheese dip' }, { el: 'Μαγιονέζα', en: 'Mayonnaise' },
      { el: 'Σως', en: 'Sauce' }, { el: 'Σως μουστάρδας', en: 'Mustard sauce' }
    ]
  },
  {
    id: 'drinks',
    el: 'Ποτά', en: 'Drinks',
    items: [
      { el: 'Αναψυκτικά', en: 'Soft drinks', del: '250 ml ή 500 ml', den: '250 ml or 500 ml' },
      { el: 'Νερό', en: 'Water', del: '500 ml ή 1 λίτρο', den: '500 ml or 1 litre' },
      { el: 'Ανθρακούχο νερό', en: 'Sparkling water', del: '250 ml', den: '250 ml' },
      { el: 'Amita Motion', en: 'Amita Motion', del: '330 ml', den: '330 ml' },
      { el: 'Ice tea', en: 'Iced tea', del: '330 ml', den: '330 ml' },
      { el: 'Μπύρες', en: 'Beers', del: 'Amstel, Alfa, Heineken, Fischer, Carlsberg, Kaiser, Fix, Mythos, 330 ml ή 500 ml', den: 'Amstel, Alfa, Heineken, Fischer, Carlsberg, Kaiser, Fix, Mythos, 330 ml or 500 ml' }
    ]
  }
];
