import { SvelteComponent, init, safe_not_equal, flush, create_slot, assign, element, set_attributes, insert, update_slot_base, get_all_dirty_from_scope, get_slot_changes, get_spread_update, transition_in, transition_out, detach, compute_rest_props, component_subscribe, exclude_internal_props, binding_callbacks } from 'svelte/internal';
import { createSectionNode } from './section.js';
import { onMount } from 'svelte';

/* src/Section.svelte generated by Svelte v3.42.4 */
const get_default_slot_changes = dirty => ({ section: dirty & /*$section*/ 2 });
const get_default_slot_context = ctx => ({ section: /*$section*/ ctx[1] });

function create_fragment(ctx) {
	let div;
	let current;
	const default_slot_template = /*#slots*/ ctx[6].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], get_default_slot_context);
	let div_levels = [/*$$restProps*/ ctx[3]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	return {
		c() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding*/ ctx[7](div);
			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, $section*/ 34)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[5],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, get_default_slot_changes),
						get_default_slot_context
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
			/*div_binding*/ ctx[7](null);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	const omit_props_names = ["title"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let $section;
	let { $$slots: slots = {}, $$scope } = $$props;
	let { title } = $$props;
	const section = createSectionNode(title);
	component_subscribe($$self, section, value => $$invalidate(1, $section = value));
	let element;

	onMount(() => {
		$section._setElement(element);
	});

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			element = $$value;
			$$invalidate(0, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('title' in $$new_props) $$invalidate(4, title = $$new_props.title);
		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
	};

	return [element, $section, section, $$restProps, title, $$scope, slots, div_binding];
}

class Section extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { title: 4 });
	}

	get title() {
		return this.$$.ctx[4];
	}

	set title(title) {
		this.$$set({ title });
		flush();
	}
}

export { Section as default };
//# sourceMappingURL=Section.svelte.js.map
