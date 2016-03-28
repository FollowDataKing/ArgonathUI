<template>
<div>
<div class="dropdown">
  <span class="select2 select2-container select2-container--default select2-container--above" dir="ltr" style="width: 100%;">
    <span class="select2-selectione select2-selection--multiple clearfix" aria-expanded="false">
      <ul v-el:toggle @mousedown.prevent="toggleDropdown" class="select2-selection__rendered">
        <li class="select2-selection__choice" v-for="option in values">
          <span class="select2-selection__choice__remove"
          role="presentation"
          @click="unapplyFilter(option)">×</span>
          {{ getOptionLabel(option) }}
          {{" [" + (filterValues[getOptionValue(option)] ? filterValues[getOptionValue(option)] : "...") + "]" }}
        </li>
        <li class="select2-search select2-search--inline">
          <input v-el:search v-show="searchable" v-model="search"
          @keyup.delete="maybeDeleteValue"
          @keyup.esc="onEscape"
          @keyup.up.prevent="typeAheadUp"
          @keyup.down.prevent="typeAheadDown"
          @keyup.enter.prevent="typeAheadSelect"
          @blur="open = false"
          @focus="open = true"
          :placeholder="searchPlaceholder"
          :style="{ width: isValueEmpty ? '100%' : 'auto' }"
          class="select2-search__field"
          :disabled="editingOption" type="search" tabindex="-1" role="textbox">
        </li>
      </ul>
      <!-- <span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span> -->
    </span>
  </span>

  <span v-show="open" :style="{ 'max-height': maxHeight }"
    class="select2-container select2-container--default select2-container--open" style="position: absolute; width: 100%">
    <span class="select2-dropdown select2-dropdown--above">
      <span class="select2-results">
        <ul class="select2-results__options">
          <li v-for="option in filteredOptions"
            class="select2-results__option"
            :class="{ 'select2-results__option--highlighted': $index === typeAheadPointer }"
            :aria-selected="isOptionSelected(option) ? 'true' : 'false'"
            role="treeitem"
            @mouseover="typeAheadPointer = $index"
            @mousedown.prevent="editFilter(option)">
            {{ getOptionLabel(option) }}
            <span style="float:right">{{ getOptionType(option) }}</span>
          </li>
        </ul>
      </span>
    </span>
  </span>
</div>
<filter-editor v-if="editingOption"
  :filter-type="getOptionType(editingOption)"
  :on-change="updateOptionValue"
  :on-submit="applyEditingFilter"
  :on-cancel="unapplyEditingFilter">
</filter-editor>
</div>
</template>


<script>
import FilterEditor from "./FilterEditor.vue"

export default {
  components: {
    FilterEditor
  },

  props: {
    /**
    * Contains the currently selected value. Very similar to a
    * `value` attribute on an <input>. In most cases, you'll want
    * to set this as a two-way binding, using :value.sync. However,
    * this will not work with Vuex, in which case you'll need to use
    * the onChange callback property.
    * @type {Object||String||null}
    */
    values: {
      default () { return [] }
    },

    /**
    * An array of strings or objects to be used as dropdown choices.
    * If you are using an array of objects, vue-select will look for
    * a `label` key (ex. [{label: 'This is Foo', value: 'foo', type: 'type'}]). A
    * custom label key can be set with the `label` prop.
    * @type {Object}
    */
    options: {
      type: Array,
      default() { return [] },
    },

    /**
    * Sets the max-height property on the dropdown list.
    * @deprecated
    * @type {String}
    */
    maxHeight: {
      type: String,
      default: '400px'
    },

    searchable: {
      type: Boolean,
      default: true
    },

    /**
    * Equivalent to the `placeholder` attribute on an `<input>`.
    * @type {Object}
    */
    placeholder: {
      type: String,
      default: ''
    },

    /**
    * Sets a Vue transition property on the `.dropdown-menu`. vue-select
    * does not include CSS for transitions, you'll need to add them yourself.
    * @type {String}
    */
    transition: {
      type: String,
      default: 'expand'
    },

    /**
    * Enables/disables clearing the search text when an option is selected.
    * @type {Boolean}
    */
    clearSearchOnSelect: {
      type: Boolean,
      default: true
    },

    /**
    * Tells vue-select what key to use when generating option
    * labels when each `option` is an object.
    * @type {String}
    */
    labelKey: {
      type: String,
      default: 'label'
    },

    /**
    * Tells vue-select what key to use when generating option
    * types when each `option` is an object.
    * @type {String}
    */
    typeKey: {
      type: String,
      default: 'type'
    },

    /**
    * An optional callback function that is called each time the selected
    * value(s) change. When integrating with Vuex, use this callback to trigger
    * an action, rather than using :value.sync to retreive the selected value.
    * @type {Function}
    * @default {null}
    */
    onFiltersChange: Function
  },

  data() {
    return {
      search: '',
      open: false,
      editingOption: undefined,
      editingFilterValue: undefined,
      filterValues: {},
      typeAheadPointer: -1,
    }
  },

  watch: {
    values(val, old) {
      this.onChange && val !== old ? this.onChange(val) : null
    },
    options() {
      this.$set('value', [])
    },
    filteredOptions() {
      this.typeAheadPointer = 0;
    },
  },

  methods: {

    /**
    * Select a given option.
    * @param  {Object||String} option
    * @return {void}
    */
    editFilter(option) {
      if (this.isOptionSelected(option) ) {
        alert("Cannot edit an applied filter!")
        return
      }
      this.values.push(option)
      console.log(this.values)
      if( this.clearSearchOnSelect ) {
        this.search = ''
      }
      this.editingOption = option
      this.open = false
    },

    /**
    * The callback to trigger when editing filter value changed
    */
    updateOptionValue(val) {
      var key = this.getOptionValue(this.editingOption)
      this.$set("filterValues." + key, val)
    },

    applyEditingFilter() {
      var key = this.getOptionValue(this.editingOption)

      //TODO apply the filter to dataset

      this.editingOption = undefined
    },

    unapplyEditingFilter() {
      this.unapplyFilter(this.editingOption)
    },

    unapplyFilter(option) {
      // Check if the filter is applied
      if (! this.isOptionSelected(option) ) {
        alert("Cannot unapply a filter not applied!")
        console.log(option)
        return
      }

      var key = this.getOptionValue(option)
      // editing ...
      if (this.editingOption) {
        var editingKey = this.getOptionValue(this.editingOption)

        if (editingKey != key) {
          alert("Cannot unpply filter other than the editing one!")
          console.log(editingKey)
          console.log(key)
          return
        }

        this.editingOption = undefined
      }

      this.$set("filterValues." + key, undefined)
      this.values.$remove(option)

    },

    getOptionFilterValue(option) {
      var key = this.getOptionValue(option)
      return this.filterValues[key]
    },

    /**
    * Toggle the visibility of the dropdown menu.
    * @param  {Event} e
    * @return {void}
    */
    toggleDropdown( e ) {
      if(!this.editingOption) {
        if(
          //e.target === this.$els.openIndicator ||
          e.target === this.$els.search ||
          e.target === this.$els.toggle ||
          e.target === this.$el
        ) {
          if( this.open ) {
            this.$els.search.blur() // dropdown will close on blur
          } else {
            this.$els.search.focus()
          }
        }
      }
    },

    /**
    * Check if the given option is currently selected.
    * @param  {Object||String}  option
    * @return {Boolean}         True when selected || False otherwise
    */
    isOptionSelected( option ) {
      return this.values.indexOf(option) !== -1
    },

    /**
    * If the selected option has option['value'] return it.
    * Otherwise, return the entire option.
    * @param  {Object||String} option
    * @return {Object||String}
    */
    getOptionValue( option ) {
      if( typeof option === 'object' && option.value ) {
        return option.value;
      }

      return option;
    },

    /**
    * Generate the option label text. If {option}
    * is an object, return option[this.labelKey].
    *
    * @param  {Object || String} option
    * @return {String}
    */
    getOptionLabel( option ) {
      if( typeof option === 'object' ) {
        if( this.labelKey && option[this.labelKey] ) {
          return option[this.labelKey];
        } else if( option.label ) {
          return option.label
        }
      }
      return option;
    },

    getOptionLabelWithFilterValue( option ) {
      var optionLabel = this.getOptionLabel( option )
      var filterVal = this.getOptionFilterValue( option )

      return optionLabel + (filterVal ? (" [" + filterVal + "]") : "")
    },

    getOptionType( option ) {
      if( typeof option === 'object' ) {
        if( this.typeKey && option[this.typeKey] ) {
          return option[this.typeKey];
        } else if( option.type ) {
          return option.type
        }
      }
      return "daterange";
    },

    /**
    * Move the typeAheadPointer visually up the list by
    * subtracting the current index by one.
    * @return {void}
    */
    typeAheadUp() {
      if (this.typeAheadPointer > 0) this.typeAheadPointer--
    },

    /**
    * Move the typeAheadPointer visually down the list by
    * adding the current index by one.
    * @return {void}
    */
    typeAheadDown() {
      if (this.typeAheadPointer < this.filteredOptions.length - 1) this.typeAheadPointer++
    },

    /**
    * Select the option at the current typeAheadPointer position.
    * Optionally clear the search input on selection.
    * @return {void}
    */
    typeAheadSelect() {
      if( this.filteredOptions[ this.typeAheadPointer ] ) {
        this.select( this.filteredOptions[ this.typeAheadPointer ] );
      }

      if( this.clearSearchOnSelect ) {
        this.search = "";
      }
    },

    /**
    * If there is any text in the search input, remove it.
    * Otherwise, blur the search input to close the dropdown.
    * @return {[type]} [description]
    */
    onEscape() {
      if( ! this.search.length ) {
        this.$els.search.blur()
      } else {
        this.$set('search', '')
      }
    },

    /**
    * Delete the value on Delete keypress when there is no
    * text in the search input, & there's tags to delete
    * @return {this.value}
    */
    maybeDeleteValue() {
      if( ! this.$els.search.value.length && this.values.length ) {
        var toRemoveOption = this.values[this.values.length - 1]
        this.unapplyFilter(toRemoveOption)
      }
    }
  },

  computed: {

    /**
    * Classes to be output on .dropdown
    * @return {Object}
    */
    dropdownClasses() {
      return {
        open: this.open,
        searchable: this.searchable
      }
    },

    /**
    * Return the placeholder string if it's set
    * & there is no value selected.
    * @return {String} Placeholder text
    */
    searchPlaceholder() {
      if( this.isValueEmpty && this.placeholder ) {
        return this.placeholder;
      }
    },

    /**
    * The currently available options, filtered
    * by the search elements value.
    * @return {[type]} [description]
    */
    filteredOptions() {
      return this.$options.filters.filterBy(this.options, this.search)
    },

    /**
    * Check if there aren't any options selected.
    * @return {Boolean}
    */
    isValueEmpty() {
      if( this.values ) {
        if( typeof this.values === 'object' ) {
          return ! Object.keys(this.values).length
        }
        return ! this.values.length
      }

      return true;
    },
  }
}
</script>
