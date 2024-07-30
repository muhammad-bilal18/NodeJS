
// getCustomer(1, (customer) => {
//     console.log('Customer: ', customer);
//     if (customer.isGold) {
//         getTopMovies((movies) => {
//             console.log('Top movies: ', movies);
//             sendEmail(customer.email, movies, () => {
//                 console.log('Email sent...')
//             });
//         });
//     }
// });

function getCustomer(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: id, name: 'Muhammad Bilal', isGold: true, email: 'emailmbilal@gmail.com' });
        }, 4000);  
    });
}
function getTopMovies(callback) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
        }, 4000);
    });
}

function sendEmail(email, movies, callback) {
    setTimeout(() => {
        console.log('email sent ...')
    }, 4000);
}

async function solve() {
    const user = await getCustomer(1);
    console.log('Customer:', user);
    if(user.isGold) {
        const movies = await getTopMovies();
        console.log('Top Movies:', movies);
        sendEmail(user.email, movies);
    }
}
solve()  