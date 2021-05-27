import React from 'react';
import { DefListProps} from '../../../types';
import SingleGroup from './SingleGroup';

const Grouped = ({items}: DefListProps) => {

return (
<>
<SingleGroup items={items} filterby="Category"></SingleGroup>
<SingleGroup items={items} filterby="Location"></SingleGroup>
<SingleGroup items={items} filterby="Confection"></SingleGroup>
</>
)}

export default Grouped;