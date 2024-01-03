const { Contact } = require("../models");

exports.createContact = (contactData, owner) => {
  return Contact.create({
    ...contactData,
    owner,
  });
};

exports.getContacts = async (query, owner) => {
  // SEARCH FEATURE =====================================

  const queryFavorite = String(query.favorite).toLowerCase();

  const findOptions = queryFavorite
    ? {
        favorite: queryFavorite,
      }
    : {};

  // INIT DB QUERY ================================
  const contactsQuery = Contact.find(findOptions).populate({
    path: "owner",
    select: ["-token", "-password"],
  });

  // PAGINATION FEATURE =============================
  // contactsQuery.limit(5); - limit of number of docs to fetch from DB
  // contactsQuery.skip(2); - numnber of docs to skip

  // page 1 = limit 10, skip 0
  // page 2 = limit 10, skip 10
  // page 3 = limit 10, skip 20

  //   const paginationPage = query.page ? +query.page : 1;
  //   const paginationLimit = query.limit ? +query.limit : 5;
  //   const docsToSkip = (paginationPage - 1) * paginationLimit;

  //   contactsQuery.skip(docsToSkip).limit(paginationLimit);

  const contacts = await contactsQuery;
  const total = await Contact.countDocuments(findOptions);

  return {
    contacts,
    total,
  };
};
