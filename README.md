<h1>Kitchen 🌱 Buddy</h1>
<h3>by Shahraz Nasir</h3>
<h3>Installation</h3>
<p>To start the application, simply clone this repository, 
open the folder in your IDE and type 'npm install' or 'yarn install' to install all the required dependencies.</p>
Once the installation is complete, you should be able to start the project on your Expo mobile platform.
<h3>Description</h3>
<p>Kitchen Buddy is a simple app the allows the user to handle a list of ingredients and manage their characteristics. Alongside the basic CRUD Operations,
a user also has the possibility to view the registered ingredients according to a variety of filters and specifics. Ingredients can be added either by providing 
all of the necessary data (only a name is mandatory), or by scanning their bar code.</p>
A more detailed explanation of each relevant characteristic is provided below.
<h3>Ingredients Characteristics</h3>
<p>Basic Data:</p>
<h5>Every ingredient has a name and may have a brand, a category, a confection (pre-selected list of confections in this case), a 
location, an expiry date and the boolean value indicating if the product has been opened or not. Additionally, the time and date at which the ingredient was added is also saved in a property named 'addedOn' in the database.</h5>
<p>Additional Data:</p>
<h5>The ingredients set as in 'Fresh' confections may possess additional data: a maturity status, indicating the ripeness status of the ingredient, and a maturity date,
referring to the time and date at which the ripeness status was checked/set.</h5>
<h3>General Rules</h3>
<p>1. As indicated before, only the name is required to add an ingredient, but, although this might be the case with some properties such as brand and location, 
it does not mean that all of the rest of the properties will remain empty. When omitted, the expiry date will be set to 24 hours (the user can of course edit this property at will) and 
the ripeness status of a fresh ingredient will be set at 'Not specified'.</p>
<p>2. As can be seen already, a clear distinction is made between fresh and non-freh ingredients, 
that is why once setting the ingredient as 'Fresh', the user will be able to switch that ingredient's confection only between 'Fresh' and 'Frozen'. In the same way,
once an ingredient is saved as in a confection other than 'Fresh', it will not be possible to switch it as 'Fresh' later. These limitations were made to avoid unnecessary
properties for certain ingredients (f.e. a non-fresh item getting properties referring to ripeness status); other than making our database cleaner and more precise, it also makes logical sense to
not allows users to switch the 'Fresh' confection at will.</p>
<p>3. A user can edit an ingredient by clicking on the 'EDIT' button, one particular aspect that may not have been as obvious is that whenever a user edits a Fresh ingredient,
its maturity date gets updated and set as the moment of the update, by making this choice, I am assuming that whenever a user changes an ingredient, they are viewing
and therefore also checking every (displayed) property of the that specific ingredient.</p>
<p>4. An ingredient can only be opened once, this is another choice made to keep the application as realistic as possible. Once opened, the expiry date of the ingredient
will be set to 24 hours (and will therefore also be added to the Expiring Soon section).</p>
<p>5. Freezing/Unfreezing works in a similar way to Opening; when Freezing, the ingredient's confection is set as 'Frozen' and extra time is added to the expiry date (so that it is minimum 6 months), on the other hand,
when Unfreezing, the ingredient's confection is set as 'Fresh' again and the expiry date is set to 24 hours (nothing will change if the expiry date, at the moment of unfreezing, is already less than or equal to 24 hours).
</p>
<h3>Components</h3>
<p>Feed: contains to sections, one with the default list with all the ingredients and one with the ingredients expiring soon (within next 24 hours).</p>
<p>Filter: auxiliary component used to filter ingredients that have the same value in a certain property.</p>
<p>Form: the largest single component of the app, contains the bar code scanner, the text fields, two option lists and a date picker for data insertion.</p>
<p>Modal: a simple modal that pops up by clicking 'EDIT' on an ingredient, it contains the form component adjusted based on the individual ingredient's characteristics..</p>
<p>Queries: a component containg four other sub-components, each handling a different query; like Feed, the main component is mainly used to push data down to the operational components.</p>
<p>Row: it contains the MainContainer component, which is used to display a dynamic and detailed representation of the ingredient, the MainContainer
is also divided into three smaller parts, each handling different information and functions.</p>
<p>Additional smaller components: 
Warning (to communicate something to the user), 
Rectangle (for unchecked ripeness UI), Square (a smaller, static and less detailed representation of the ingredient).</p>
<h3>Screens</h3>
<p>HomeScreen: contains the Feed component.</p>
<p>NewItemScreen: contains the Form component.</p>
<p>QueriesScreen: contains the Queries component.</p>
<p>NotFoundScreen: extra screen for non-existing paths.</p>
<h3>Utils</h3>
In the utils Folder, three files can be found: firebase.tsx (the stablish the connection to firebase and to the database itself), 
actions.tsx (handling all the operations related to firebase queries) and query.tsx (handling the call to the OpenFoodFactsAPI from the scanner).
<h3>Navigation</h3>
A bottom tabs navigation is set up for the project, all the relevant information can be found inside the BottomTabNavigator.tsx 
file and the index.tsx file inside the folder. Note: the 'LinkingConfiguration.tsx' was already present in the project before I started, since I don't have enough 
knowledge about Deep Linking to correctly configure it and removing it would break the application, I decided to leave it in the folder.
<h3>Constants</h3>
This folder contains the main styling and constant color variables.





