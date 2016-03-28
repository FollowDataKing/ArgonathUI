<template>
<div>
<div class="dropdown">
  <span class="select2 select2-container select2-container--default select2-container--above" dir="ltr" style="width: 100%;">
    <span class="select2-selectione select2-selection--multiple clearfix" aria-expanded="false">
      <ul v-el:toggle @mousedown.prevent="toggleDropdown" class="select2-selection__rendered">
        <li v-for="filterKey in appliedFilters"
          class="select2-selection__choice"
          @click="unapplyFilter(filterKey)">
          <span v-show="isFilterUnappliable(filterKey)" class="select2-selection__choice__remove" role="presentation">×</span>
          {{ filterOptions[filterKey].label }}
          {{" [" + (appliedFilterValues[filterKey] ? appliedFilterValues[filterKey] : "...") + "]" }}
        </li>
        <li class="select2-search select2-search--inline">
          <input v-el:search v-show="true" v-model="search"
          @keyup.delete="maybeDeleteValue"
          @keyup.esc="onEscape"
          @keyup.up.prevent="typeAheadUp"
          @keyup.down.prevent="typeAheadDown"
          @keyup.enter.prevent="typeAheadSelect"
          @blur="open = false"
          @focus="open = true"
          :placeholder="searchPlaceholder"
          :style="{ width: isAppliedFiltersEmpty ? '100%' : 'auto' }"
          class="select2-search__field"
          :disabled="editingFilterKey" type="search" tabindex="-1" role="textbox">
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
          <li v-for="filterKey in filteredOptions"
            v-if="isFilterAppliable(filterKey)"
            class="select2-results__option"
            :class="{ 'select2-results__option--highlighted': $index === typeAheadPointer }"
            :aria-selected="isFilterApplied(filterKey) ? 'true' : 'false'"
            :aria-disabled="isFilterApplied(filterKey) ? 'true' : 'false'"
            role="treeitem"
            @mouseover="typeAheadPointer = $index"
            @mousedown.prevent="editFilter(filterKey)">
            {{ filterOptions[filterKey].label }}
            <span style="float:right">{{ filterOptions[filterKey].type }}</span>
          </li>
        </ul>
      </span>
    </span>
  </span>
</div>
<filter-editor v-if="editingFilterKey"
  :filter-type="filterOptions[editingFilterKey].type"
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
    // The filter options to apply
    filterOptions: {
      default() { return {} },
    },

    maxHeight: {
      type: String,
      default: '400px'
    },

    placeholder: {
      type: String,
      default: ''
    },

    onFiltersChange: Function
  },

  data() {
    return {
      search: '',
      open: false,
      editingFilterKey: undefined,
      typeAheadPointer: -1,
      appliedFilters: [],
      appliedFilterValues: {},
    }
  },

  watch: {
    appliedFilters(val, old) {
      this.onChange && val !== old ? this.onChange(val) : null
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
    editFilter(filterKey) {
      if (this.isFilterApplied(filterKey) ) {
        alert("Cannot edit an applied filter!")
        return
      }

      var filter = this.filterOptions[filterKey]

      // If filter has dependence, insert the filter right after its parent
      if (filter.depend && this.isFilterApplied(filter.depend)) {
        var insertIdx = this.appliedFilters.indexOf(filter.depend)
        this.appliedFilters.splice(insertIdx + 1, 0, filterKey);
      // else, append it directly
      } else {
        this.appliedFilters.push(filterKey)
      }

      this.editingFilterKey = filterKey
      this.open = false
      this.search = ''
    },

    /**
    * The callback to trigger when editing filter value changed
    */
    updateOptionValue(val) {
      this.$set("appliedFilterValues." + this.editingFilterKey, val)
    },

    applyEditingFilter() {

      //TODO apply the filter to dataset

      this.editingFilterKey = undefined
    },

    isFilterUnappliable(filterKey) {
      // Check if the filter is already applied
      if (! this.isFilterApplied(filterKey) ) {
        return false
      }

      // While editing, only the editingFilterKey can be unapplied
      if (this.editingFilterKey && this.editingFilterKey != filterKey) {
        return false
      }

      for (var filterIdx in this.appliedFilters) {
        var filterIter = this.appliedFilters[filterIdx]
        if (filterIter != filterKey) {
          var filterOption = this.filterOptions[filterIter]
          if (filterOption.depend && filterOption.depend == filterKey) {
            return false
          }
        }
      }

      return true
    },

    isFilterAppliable(filterKey) {
      var option = this.filterOptions[filterKey]

      // This filter is already applied
      if (this.isFilterApplied(filterKey) ) {
        return false
      }

      if (option.depend) {
        return this.isFilterApplied(option.depend)
      }

      return true
    },

    unapplyEditingFilter() {
      this.unapplyFilter(this.editingFilterKey)
    },

    unapplyFilter(filterKey) {
      // Check if the filter is applied
      if (! this.isFilterApplied(filterKey) ) {
        alert("Cannot unapply a filter not applied!")
        return
      }

      // editing ...
      if (this.editingFilterKey) {

        if (this.editingFilterKey != filterKey) {
          alert("Cannot unpply filter other than the editing one!")
          return
        }

        this.editingFilterKey = undefined
      }

      this.$set("appliedFilterValues." + filterKey, undefined)
      this.appliedFilters.$remove(filterKey)
    },

    getOptionFilterValue(filterKey) {
      return this.appliedFilterValues[filterKey]
    },

    /**
    * Toggle the visibility of the dropdown menu.
    * @param  {Event} e
    * @return {void}
    */
    toggleDropdown( e ) {
      if(!this.editingFilterKey) {
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
    isFilterApplied( filterKey ) {
      return this.appliedFilters.indexOf(filterKey) !== -1
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
        this.editFilter( this.filteredOptions[ this.typeAheadPointer ] );
      }

      this.search = "";
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
      if( ! this.$els.search.value.length && this.appliedFilters.length ) {
        this.unapplyFilter(this.appliedFilters[this.appliedFilters.length - 1])
      }
    }
  },

  computed: {

    /**
    * Return the placeholder string if it's set
    * & there is no value selected.
    * @return {String} Placeholder text
    */
    searchPlaceholder() {
      if( this.isAppliedFiltersEmpty && this.placeholder ) {
        return this.placeholder;
      }
    },

    /**
    * The currently available filterOptions, filtered
    * by the search elements value.
    * @return {[type]} [description]
    */
    filteredOptions() {
      return (this.$options.filters.filterBy(this.filterOptions, this.search).map(function(item) { return item.$key }))
    },

    /**
    * Check if there aren't any filterOptions selected.
    * @return {Boolean}
    */
    isAppliedFiltersEmpty() {
      if( this.appliedFilters ) {
        if( typeof this.appliedFilters === 'object' ) {
          return ! Object.keys(this.appliedFilters).length
        }
        return ! this.appliedFilters.length
      }

      return true;
    },
  }
}
</script>
