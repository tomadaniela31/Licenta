exports.show = async function(req, res) {
  let gamePath = '';
  switch(req.params.id) {
    case '1':
      gamePath = 'games/attention';
      break;
    case '2':
      gamePath = 'games/orientation';
      break;
    case '3':
      gamePath = 'games/cause_effect';
      break;
    case '4':
      gamePath = 'games/syllables';
      break;
    case '5':
      gamePath = 'games/rhyme';
      break;
    case '6':
      gamePath = 'games/actions_order';
      break;
  }

  res.render(gamePath);
}
