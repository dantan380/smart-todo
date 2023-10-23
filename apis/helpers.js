
//'To Eat'
//'To Read'
//'To Buy'
//'To Watch'

//Takes in  an array of categories.  [{name: 'Automobile/Wheels', confidence: '0.512'},{name: 'Food/Drink', confidence: '0.345'}]
//return one of the categories in our DB table categories.
const toReadCategories = ['/Books & Literature', '/Arts & Entertainment/Comics & Animation/Anime & Manga', 'Arts & Entertainment/Comics & Animation/Comics'];
const toWatchCategories = ['Arts & Entertainment/Entertainment Industry/Film & TV Industry', 'Arts & Entertainment/Movies', '/Arts & Entertainment/TV & Video/TV Shows & Programs']
const organizeCategories = function(categories) {

  if(categories && categories.length == 0) {
    console.log("No categories found, defaulting 'To Buy'");
    return 'To Buy';
  }

  const highestConfidenceCategory = categories[0];
  //do stuff with element
  if (highestConfidenceCategory.name.includes('/Food & Drink/Restaurants')) {
    console.log("classified TO EAT: ", highestConfidenceCategory.name);
    return 'To Eat';
  }

  if (toReadCategories.some(word => highestConfidenceCategory.name.includes(word))) {
    console.log("classified TO READ: ", highestConfidenceCategory.name);
    return 'To Read';
  }

  if (toWatchCategories.some(word => highestConfidenceCategory.name.includes(word))) {
    console.log("classied TO WATCH:", highestConfidenceCategory.name);
    return 'To Watch';
  }

  //else, it's a product
  console.log("classified TO BUY: ", highestConfidenceCategory.name);
  return 'To Buy';
};

module.exports = { organizeCategories };