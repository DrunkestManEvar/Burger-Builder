import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach(
    () =>
      (wrapper = shallow(<BurgerBuilder initIngredientsHandler={() => {}} />))
  );

  it('should not render any <BuildControls /> components when there are no ingredients props', () => {
    expect(wrapper.find(BuildControls)).toHaveLength(0);
  });

  it('should render a <BuildControls /> component when the ingredients are received as a prop', () => {
    wrapper.setProps({ ingredients: { salad: 1 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
