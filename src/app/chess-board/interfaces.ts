export interface IGameBoard {
    puzzle_no: number, 
    rating: number,
    rows: number,
    cols: number,
    board: IBoard
}
export interface IBoard {
    pieces: string, 
    last_move_squares: IMoveSquares,
    special_square: IPosition
}
export interface IMoveSquares {
    from: IPosition,
    to: IPosition
}
export interface IPosition {
    row: number,
    col: number
}