import { shallowMount, Wrapper } from '@vue/test-utils'
import ProductsHeader from '@/components/product/ProductHeader.vue'

describe('ProductsHeader — Sort Dropdown', () => {
  let wrapper: Wrapper<Vue>

  beforeEach(() => {
    wrapper = shallowMount(ProductsHeader)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  describe('initial state', () => {
    it('renders the section title', () => {
      expect(wrapper.find('[data-test="products-title"]').text()).toBe('Explore Our Products')
    })

    it('renders the sort label', () => {
      expect(wrapper.find('[data-test="sort-label"]').text()).toBe('Sort by')
    })

    it('displays "Highest Rating" as the default selected option', () => {
      expect(wrapper.find('[data-test="dropdown-selected"]').text().trim()).toBe('Highest Rating')
    })

    it('does not render the dropdown menu on mount', () => {
      expect(wrapper.find('[data-test="dropdown-menu"]').exists()).toBe(false)
    })
  })

  describe('toggle behaviour', () => {
    it('opens the dropdown menu when the trigger is clicked', async () => {
      await wrapper.find('[data-test="dropdown"]').trigger('click')
      expect(wrapper.find('[data-test="dropdown-menu"]').exists()).toBe(true)
    })

    it('closes the dropdown menu on a second click', async () => {
      const dropdown = wrapper.find('[data-test="dropdown"]')
      await dropdown.trigger('click')
      await dropdown.trigger('click')
      expect(wrapper.find('[data-test="dropdown-menu"]').exists()).toBe(false)
    })
  })

  describe('menu options', () => {
    beforeEach(async () => {
      await wrapper.find('[data-test="dropdown"]').trigger('click')
    })

    it('renders all three sort options', () => {
      const items = wrapper.findAll('[data-test^="dropdown-item-"]')
      expect(items).toHaveLength(3)
    })

    it('renders "Highest Rating" option', () => {
      expect(wrapper.find('[data-test="dropdown-item-highest-rating"]').exists()).toBe(true)
    })

    it('renders "Price: Low to High" option', () => {
      expect(wrapper.find('[data-test="dropdown-item-price--low-to-high"]').exists()).toBe(true)
    })

    it('renders "Price: High to Low" option', () => {
      expect(wrapper.find('[data-test="dropdown-item-price--high-to-low"]').exists()).toBe(true)
    })
  })

  describe('option selection', () => {
    beforeEach(async () => {
      await wrapper.find('[data-test="dropdown"]').trigger('click')
    })

    it('updates the selected label when "Price: Low to High" is chosen', async () => {
      await wrapper.find('[data-test="dropdown-item-price--low-to-high"]').trigger('click')
      expect(wrapper.find('[data-test="dropdown-selected"]').text().trim()).toBe(
        'Price: Low to High'
      )
    })

    it('updates the selected label when "Price: High to Low" is chosen', async () => {
      await wrapper.find('[data-test="dropdown-item-price--high-to-low"]').trigger('click')
      expect(wrapper.find('[data-test="dropdown-selected"]').text().trim()).toBe(
        'Price: High to Low'
      )
    })

    it('closes the menu after an option is selected', async () => {
      await wrapper.find('[data-test="dropdown-item-highest-rating"]').trigger('click')
      expect(wrapper.find('[data-test="dropdown-menu"]').exists()).toBe(false)
    })

    it('emits a "change" event with the selected value', async () => {
      await wrapper.find('[data-test="dropdown-item-price--low-to-high"]').trigger('click')
      expect(wrapper.emitted('change')).toBeTruthy()
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(wrapper.emitted('change')![0]).toEqual(['Price: Low to High'])
    })

    it('emits "change" only once per selection', async () => {
      await wrapper.find('[data-test="dropdown-item-highest-rating"]').trigger('click')
      expect(wrapper.emitted('change')).toHaveLength(1)
    })
  })

  describe('click outside to close', () => {
    it('closes the dropdown when a click is detected outside', async () => {
      await wrapper.find('[data-test="dropdown"]').trigger('click')
      expect(wrapper.find('[data-test="dropdown-menu"]').exists()).toBe(true)

      document.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await wrapper.vm.$nextTick()

      expect(wrapper.find('[data-test="dropdown-menu"]').exists()).toBe(false)
    })

    it('keeps the dropdown open when clicking inside it', async () => {
      await wrapper.find('[data-test="dropdown"]').trigger('click')

      const dropdownEl = wrapper.find('[data-test="dropdown"]').element
      dropdownEl.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await wrapper.vm.$nextTick()

      expect(wrapper.find('[data-test="dropdown-menu"]').exists()).toBeDefined()
    })
  })

  describe('cleanup', () => {
    it('removes the document click listener on destroy', () => {
      const removeSpy = jest.spyOn(document, 'removeEventListener')
      wrapper.destroy()
      expect(removeSpy).toHaveBeenCalledWith('click', expect.any(Function))
      removeSpy.mockRestore()
    })
  })
})
