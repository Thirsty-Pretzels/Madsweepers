//MJ in progress: getting board from server to load
// export default function() {
//   socket.emit('getBoard');
//   socket.on('getBoard', function(board) {
//     console.log(JSON.stringify(board.board), 'receiving board from server');
//     return board.board;
//   })
// }


export default function() {
  console.log('inside reducer_board');
  return [
    [
      {"val":0,"status":0,"flaggedBy":null,"surface":null},
      {"val":0,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":3,"status":0,"flaggedBy":null,"surface":null},
      {"val":3,"status":0,"flaggedBy":null,"surface":null},
      {"val":3,"status":0,"flaggedBy":null,"surface":null},
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":0,"status":0,"flaggedBy":null,"surface":null}],
    [
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":9,"status":0,"flaggedBy":null,"surface":null},
      {"val":9,"status":0,"flaggedBy":null,"surface":null},
      {"val":9,"status":0,"flaggedBy":null,"surface":null},
      {"val":9,"status":0,"flaggedBy":null,"surface":null},
      {"val":9,"status":0,"flaggedBy":null,"surface":null},
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":0,"status":0,"flaggedBy":null,"surface":null}],
    [
      {"val":9,"status":0,"flaggedBy":null,"surface":null},
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":3,"status":0,"flaggedBy":null,"surface":null},
      {"val":4,"status":0,"flaggedBy":null,"surface":null},
      {"val":9,"status":0,"flaggedBy":null,"surface":null},
      {"val":9,"status":0,"flaggedBy":null,"surface":null},
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":0,"status":0,"flaggedBy":null,"surface":null}],
    [
      {"val":9,"status":0,"flaggedBy":null,"surface":null},
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":0,"status":0,"flaggedBy":null,"surface":null},
      {"val":0,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":3,"status":0,"flaggedBy":null,"surface":null},
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":0,"status":0,"flaggedBy":null,"surface":null}],
    [
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":9,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null}],
    [
      {"val":0,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":9,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":9,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null}],
    [
      {"val":0,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null}],
    [
      {"val":0,"status":0,"flaggedBy":null,"surface":null},
      {"val":0,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":9,"status":0,"flaggedBy":null,"surface":null},
      {"val":4,"status":0,"flaggedBy":null,"surface":null},
      {"val":9,"status":0,"flaggedBy":null,"surface":null},
      {"val":3,"status":0,"flaggedBy":null,"surface":null},
      {"val":9,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":0,"status":0,"flaggedBy":null,"surface":null}],
    [
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":9,"status":0,"flaggedBy":null,"surface":null},
      {"val":9,"status":0,"flaggedBy":null,"surface":null},
      {"val":4,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":0,"status":0,"flaggedBy":null,"surface":null}],
    [
      {"val":9,"status":0,"flaggedBy":null,"surface":null},
      {"val":9,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":1,"status":0,"flaggedBy":null,"surface":null},
      {"val":3,"status":0,"flaggedBy":null,"surface":null},
      {"val":9,"status":0,"flaggedBy":null,"surface":null},
      {"val":2,"status":0,"flaggedBy":null,"surface":null},
      {"val":0,"status":0,"flaggedBy":null,"surface":null},
      {"val":0,"status":0,"flaggedBy":null,"surface":null},
      {"val":0,"status":0,"flaggedBy":null,"surface":null}]];
}