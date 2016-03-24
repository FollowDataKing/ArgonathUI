<template>
  <div class="dropdown">
  <span class="select2 select2-container select2-container--default select2-container--above"
    dir="ltr" style="width: 100%;">
    <span class="select2-selectione select2-selection--multiple clearfix" aria-expanded="false">
        <ul v-el:toggle @mousedown.prevent="toggleDropdown" class="select2-selection__rendered">
          <li class="select2-selection__choice" v-for="option in values">
            <span class="select2-selection__choice__remove"
              role="presentation"
              @click="select(option)">×</span>
            {{ getOptionLabel(option) }}
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
            class="select2-search__field" type="search" tabindex="-1" role="textbox" style="width: 100%;">
          </li>
        </ul>

        <!-- <i v-el:open-indicator role="presentation" class="open-indicator glyphicon-triangle-bottom glyphicon"></i> -->
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
            @mousedown.prevent="select(option)">
            {{ getOptionLabel(option) }}
            <span style="float:right">{{ getOptionType(option) }}</span>
        </li>
      </ul>
    </span>
  </span>
</span>

    <!-- <div  v-show="editingOption" :style="{ 'max-height': maxHeight }">
      <input type="text" class="form-control"></input></li>
    </div> -->


  </div>
</template>


<script>
  export default {
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
       * a `label` key (ex. [{label: 'This is Foo', value: 'foo'}]). A
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
      onChange: Function
    },

    data() {
      return {
        search: '',
        open: false,
        editingOption: undefined,
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
      select(option) {
          if (! this.isOptionSelected(option) ) {
                this.values.push(option)
          } else {
              this.values.$remove(option)
          }

          // this.open = !this.open

      },

      /**
       * Select a given option.
       * @param  {Object||String} option
       * @return {void}
       */
      //  edit(option) {
      //    if (! this.isOptionSelected(option) ) {
      //      this.values.push(option)
      //    } else {
      //      this.values.$remove(option)
      //    }
       //
      //    if( this.clearSearchOnSelect ) {
      //      this.search = ''
      //    }
      //    this.editingOption = option
       //
      //    this.open = !this.open
      //  },

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
             console.log("clieck on " + this.open)
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

       getOptionType( option ) {
         if( typeof option === 'object' ) {
           if( this.typeKey && option[this.typeKey] ) {
             return option[this.typeKey];
           } else if( option.type ) {
             return option.type
           }
         }
         return "text";
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
           return this.values.pop()
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
