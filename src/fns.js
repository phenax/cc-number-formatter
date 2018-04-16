
const isEmpty = x => x !== undefined && x !== null;

export const Container = x => ({
    map: f => Container(f(x)),
    fold: f => f(x),
});

// export const Maybe = x => ({
//     map: f => Maybe(isEmpty(x)? x: f(x)),
//     fold: f => isEmpty(x)? x: f(x),
// });

export const Either = x => (!!x ? Either.Right(x) : Either.Left(x));

Either.Left = x => ({
    // map: _ => Either.Left(x),
    fold: (f, _) => f(x),
});

Either.Right = x => ({
    // map: f => Either.Right(f(x)),
    fold: (_, f) => f(x),
});
