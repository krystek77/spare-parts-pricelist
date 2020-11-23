# DESCRIPTION

The application allows you to create price lists of spare parts. The application was created because I wanted to solve the problem of current prices, price search, in the company I am currently working on.The prices of spare parts may be in PLN or EUR. If they are in PLN, the sale price is not converted and must be given, and spare parts in EUR,
the sale price is calculated according to the algorithm used and current EUR exchange rate.

## Technological stack

1. React
2. Firebase (services: cloud firestore, auth, storage)

### Use

If you want to use it, you need create at least one account user with role="admin" (see: dbschema.json). The application in completly free to use, improve, learn, add other functionalities, etc.

1. Create account on firebase
2. Create account user who will be admin, and collection users with roles = "admin" (see:dbschema.json)
3. Set your credentials for firebase services (see: env.example)
4. clone repository
5. npm install
6. npm start

### What can do admin user

1. Add another user with role "admin"
2. Add user with role "user"
3. Create pricelist
4. Delete pricelist he added
5. Add spare part to pricelist
6. Delete spare part he added
7. Edit spare part he added
8. Browse own pricelists
9. Browse all pricelists and spare parts
10. Browse users profiles and update own profile
11. Change password, avatar, itp.
12. Fliter spare parts by name

### What can do regular user

1. Browse all pricelists
2. Browse all spare parts
3. Edit profile
4. Delete account
5. Fliter spare parts by name

#### Link to app

<https://spare-parts-pricelist.web.app/>
[GitHub](http://github.com)
