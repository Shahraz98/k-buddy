import React from 'react';
import { DefListProps} from '../../../types';
import SingleGroup from './SingleGroup';

const Grouped = ({items}: DefListProps) => {

return (
<>
<SingleGroup items={items} filterby="Category" groupIcon="fastfood"></SingleGroup>
<SingleGroup items={items} filterby="Location" groupIcon="kitchen"></SingleGroup>
<SingleGroup items={items} filterby="Confection" groupIcon="shopping-basket"></SingleGroup>
</>
)}

export default Grouped;