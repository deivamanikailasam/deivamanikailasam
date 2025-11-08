import {
  Tooltip,
  TooltipModule
} from "./chunk-FCFQMKMQ.js";
import "./chunk-TNWZTUEL.js";
import {
  RouterLink,
  RouterLinkActive,
  RouterModule
} from "./chunk-PTTLEW2J.js";
import "./chunk-DR7J7ZOX.js";
import "./chunk-RL2EU4KX.js";
import {
  Ripple
} from "./chunk-TSNIEPLZ.js";
import {
  BaseComponent,
  PARENT_INSTANCE
} from "./chunk-TOWIVA3R.js";
import {
  BaseStyle
} from "./chunk-YVHTVS74.js";
import "./chunk-JGT4KVVW.js";
import {
  Bind
} from "./chunk-3QIWPVBQ.js";
import {
  PrimeTemplate,
  SharedModule
} from "./chunk-GBGWG5S2.js";
import {
  CommonModule,
  NgIf,
  NgStyle,
  NgTemplateOutlet
} from "./chunk-OCTVBAP2.js";
import "./chunk-RDHXSB74.js";
import {
  Y,
  m,
  s3 as s,
  z
} from "./chunk-47D2QLSA.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  Output,
  ViewChild,
  ViewEncapsulation,
  inject,
  setClassMetadata,
  signal,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵviewQuery
} from "./chunk-7RZT75AC.js";
import "./chunk-HWYXSU2G.js";
import "./chunk-JRFR6BLO.js";
import "./chunk-MARUHEWW.js";
import "./chunk-GOMI4DH3.js";

// node_modules/@primeuix/styles/dist/dock/index.mjs
var style = "\n    .p-dock {\n        position: absolute;\n        z-index: 1;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        pointer-events: none;\n    }\n\n    .p-dock-list-container {\n        display: flex;\n        pointer-events: auto;\n        background: dt('dock.background');\n        border: 1px solid dt('dock.border.color');\n        padding: dt('dock.padding');\n        border-radius: dt('dock.border.radius');\n    }\n\n    .p-dock-list {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        outline: 0 none;\n    }\n\n    .p-dock-item {\n        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n        will-change: transform;\n        padding: dt('dock.item.padding');\n        border-radius: dt('dock.item.border.radius');\n    }\n\n    .p-dock-item.p-focus {\n        box-shadow: dt('dock.item.focus.ring.shadow');\n        outline: dt('dock.item.focus.ring.width') dt('dock.item.focus.ring.style') dt('dock.item.focus.ring.color');\n        outline-offset: dt('dock.item.focus.ring.offset');\n    }\n\n    .p-dock-item-link {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n        position: relative;\n        overflow: hidden;\n        cursor: default;\n        width: dt('dock.item.size');\n        height: dt('dock.item.size');\n    }\n\n    .p-dock-top {\n        left: 0;\n        top: 0;\n        width: 100%;\n    }\n\n    .p-dock-bottom {\n        left: 0;\n        bottom: 0;\n        width: 100%;\n    }\n\n    .p-dock-right {\n        right: 0;\n        top: 0;\n        height: 100%;\n    }\n\n    .p-dock-right .p-dock-list {\n        flex-direction: column;\n    }\n\n    .p-dock-left {\n        left: 0;\n        top: 0;\n        height: 100%;\n    }\n\n    .p-dock-left .p-dock-list {\n        flex-direction: column;\n    }\n\n    .p-dock-mobile.p-dock-top .p-dock-list-container,\n    .p-dock-mobile.p-dock-bottom .p-dock-list-container {\n        overflow-x: auto;\n        width: 100%;\n    }\n\n    .p-dock-mobile.p-dock-top .p-dock-list-container .p-dock-list,\n    .p-dock-mobile.p-dock-bottom .p-dock-list-container .p-dock-list {\n        margin: 0 auto;\n    }\n\n    .p-dock-mobile.p-dock-left .p-dock-list-container,\n    .p-dock-mobile.p-dock-right .p-dock-list-container {\n        overflow-y: auto;\n        height: 100%;\n    }\n\n    .p-dock-mobile.p-dock-left .p-dock-list-container .p-dock-list,\n    .p-dock-mobile.p-dock-right .p-dock-list-container .p-dock-list {\n        margin: auto 0;\n    }\n\n    .p-dock-mobile .p-dock-list .p-dock-item {\n        transform: none;\n        margin: 0;\n    }\n";

// node_modules/primeng/fesm2022/primeng-dock.mjs
var _c0 = ["item"];
var _c1 = ["list"];
var _c2 = (a0, a1) => ({
  item: a0,
  id: a1
});
var _c3 = () => ({
  exact: false
});
var _c4 = (a0) => ({
  $implicit: a0
});
var _forTrack0 = ($index, $item) => $item.label;
function Dock_For_4_li_0_a_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 11);
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext(3);
    const item_r3 = ctx_r5.$implicit;
    const ɵ$index_5_r5 = ctx_r5.$index;
    const ctx_r3 = ɵɵnextContext();
    ɵɵclassMap(ctx_r3.cn(ctx_r3.cx("itemIcon"), item_r3.icon));
    ɵɵproperty("ngStyle", item_r3.iconStyle)("pBind", ctx_r3.getPTOptions(item_r3, ɵ$index_5_r5, "itemIcon"));
  }
}
function Dock_For_4_li_0_a_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Dock_For_4_li_0_a_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "a", 8);
    ɵɵtemplate(1, Dock_For_4_li_0_a_2_span_1_Template, 1, 4, "span", 9)(2, Dock_For_4_li_0_a_2_ng_container_2_Template, 1, 0, "ng-container", 10);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext(2);
    const item_r3 = ctx_r5.$implicit;
    const ɵ$index_5_r5 = ctx_r5.$index;
    const ctx_r3 = ɵɵnextContext();
    ɵɵclassMap(ctx_r3.cx("itemLink"));
    ɵɵproperty("routerLink", item_r3.routerLink)("queryParams", item_r3.queryParams)("routerLinkActiveOptions", item_r3.routerLinkActiveOptions || ɵɵpureFunction0(19, _c3))("target", item_r3.target)("tooltipOptions", item_r3.tooltipOptions)("fragment", item_r3.fragment)("queryParamsHandling", item_r3.queryParamsHandling)("preserveFragment", item_r3.preserveFragment)("skipLocationChange", item_r3.skipLocationChange)("replaceUrl", item_r3.replaceUrl)("state", item_r3.state)("pBind", ctx_r3.getPTOptions(item_r3, ɵ$index_5_r5, "itemLink"));
    ɵɵattribute("tabindex", item_r3.disabled ? null : item_r3.tabindex ? item_r3.tabindex : "-1")("aria-hidden", true);
    ɵɵadvance();
    ɵɵproperty("ngIf", item_r3.icon && !ctx_r3.itemTemplate && !ctx_r3._itemTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r3.itemTemplate || ctx_r3.itemTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(20, _c4, item_r3));
  }
}
function Dock_For_4_li_0_ng_template_3_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 11);
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext(3);
    const item_r3 = ctx_r5.$implicit;
    const ɵ$index_5_r5 = ctx_r5.$index;
    const ctx_r3 = ɵɵnextContext();
    ɵɵclassMap(ctx_r3.cn(ctx_r3.cx("itemIcon"), item_r3.icon));
    ɵɵproperty("ngStyle", item_r3.iconStyle)("pBind", ctx_r3.getPTOptions(item_r3, ɵ$index_5_r5, "itemIcon"));
  }
}
function Dock_For_4_li_0_ng_template_3_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Dock_For_4_li_0_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "a", 12);
    ɵɵtemplate(1, Dock_For_4_li_0_ng_template_3_span_1_Template, 1, 4, "span", 9)(2, Dock_For_4_li_0_ng_template_3_ng_container_2_Template, 1, 0, "ng-container", 10);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext(2);
    const item_r3 = ctx_r5.$implicit;
    const ɵ$index_5_r5 = ctx_r5.$index;
    const ctx_r3 = ɵɵnextContext();
    ɵɵclassMap(ctx_r3.cx("itemLink"));
    ɵɵproperty("tooltipPosition", item_r3.tooltipPosition)("tooltipOptions", item_r3.tooltipOptions)("target", item_r3.target)("pBind", ctx_r3.getPTOptions(item_r3, ɵ$index_5_r5, "itemLink"));
    ɵɵattribute("href", item_r3.url || null, ɵɵsanitizeUrl)("tabindex", item_r3.disabled ? null : item_r3.tabindex ? item_r3.tabindex : "-1")("aria-hidden", true);
    ɵɵadvance();
    ɵɵproperty("ngIf", item_r3.icon && !ctx_r3.itemTemplate && !ctx_r3._itemTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r3.itemTemplate || ctx_r3._itemTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(12, _c4, item_r3));
  }
}
function Dock_For_4_li_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 6);
    ɵɵlistener("click", function Dock_For_4_li_0_Template_li_click_0_listener($event) {
      ɵɵrestoreView(_r2);
      const item_r3 = ɵɵnextContext().$implicit;
      const ctx_r3 = ɵɵnextContext();
      return ɵɵresetView(ctx_r3.onItemClick($event, item_r3));
    })("mouseenter", function Dock_For_4_li_0_Template_li_mouseenter_0_listener() {
      ɵɵrestoreView(_r2);
      const ɵ$index_5_r5 = ɵɵnextContext().$index;
      const ctx_r3 = ɵɵnextContext();
      return ɵɵresetView(ctx_r3.onItemMouseEnter(ɵ$index_5_r5));
    });
    ɵɵelementStart(1, "div", 2);
    ɵɵtemplate(2, Dock_For_4_li_0_a_2_Template, 3, 22, "a", 7)(3, Dock_For_4_li_0_ng_template_3_Template, 3, 14, "ng-template", null, 1, ɵɵtemplateRefExtractor);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const elseBlock_r7 = ɵɵreference(4);
    const ctx_r5 = ɵɵnextContext();
    const item_r3 = ctx_r5.$implicit;
    const ɵ$index_5_r5 = ctx_r5.$index;
    const ctx_r3 = ɵɵnextContext();
    ɵɵclassMap(ctx_r3.cn(ctx_r3.cx("item", ɵɵpureFunction2(13, _c2, item_r3, ctx_r3.getItemId(item_r3, ɵ$index_5_r5))), item_r3 == null ? null : item_r3.styleClass));
    ɵɵproperty("pBind", ctx_r3.getPTOptions(item_r3, ɵ$index_5_r5, "item"));
    ɵɵattribute("id", ctx_r3.getItemId(item_r3, ɵ$index_5_r5))("aria-label", item_r3.label)("aria-disabled", ctx_r3.disabled(item_r3) || false)("data-p-focused", ctx_r3.isItemActive(ctx_r3.getItemId(item_r3, ɵ$index_5_r5)))("data-p-disabled", ctx_r3.disabled(item_r3) || false);
    ɵɵadvance();
    ɵɵclassMap(ctx_r3.cx("itemContent"));
    ɵɵproperty("pBind", ctx_r3.getPTOptions(item_r3, ɵ$index_5_r5, "itemContent"));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r3.isClickableRouterLink(item_r3))("ngIfElse", elseBlock_r7);
  }
}
function Dock_For_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Dock_For_4_li_0_Template, 5, 16, "li", 5);
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    ɵɵproperty("ngIf", item_r3.visible !== false);
  }
}
var classes = {
  root: ({
    instance
  }) => ["p-dock p-component", `p-dock-${instance.position}`, {
    "p-dock-mobile": instance.queryMatches()
  }],
  listContainer: "p-dock-list-container",
  list: "p-dock-list",
  item: ({
    instance,
    item,
    id
  }) => ["p-dock-item", {
    "p-focus": instance.isItemActive(id),
    "p-disabled": instance.disabled(item)
  }],
  itemContent: "p-dock-item-content",
  itemLink: "p-dock-item-link",
  itemIcon: "p-dock-item-icon"
};
var DockStyle = class _DockStyle extends BaseStyle {
  name = "dock";
  style = style;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDockStyle_BaseFactory;
    return function DockStyle_Factory(__ngFactoryType__) {
      return (ɵDockStyle_BaseFactory || (ɵDockStyle_BaseFactory = ɵɵgetInheritedFactory(_DockStyle)))(__ngFactoryType__ || _DockStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _DockStyle,
    factory: _DockStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DockStyle, [{
    type: Injectable
  }], null, null);
})();
var DockClasses;
(function(DockClasses2) {
  DockClasses2["root"] = "p-dock";
  DockClasses2["listContainer"] = "p-dock-list-container";
  DockClasses2["list"] = "p-dock-list";
  DockClasses2["item"] = "p-dock-item";
  DockClasses2["itemContent"] = "p-dock-item-content";
  DockClasses2["itemLink"] = "p-dock-item-link";
  DockClasses2["itemIcon"] = "p-dock-item-icon";
})(DockClasses || (DockClasses = {}));
var DOCK_INSTANCE = new InjectionToken("DOCK_INSTANCE");
var Dock = class _Dock extends BaseComponent {
  cd;
  /**
   * Current id state as a string.
   * @group Props
   */
  id;
  /**
   * Class of the element.
   * @deprecated since v20.0.0, use `class` instead.
   * @group Props
   */
  styleClass;
  /**
   * MenuModel instance to define the action items.
   * @group Props
   */
  model = null;
  /**
   * Position of element.
   * @group Props
   */
  position = "bottom";
  /**
   * Defines a string that labels the input for accessibility.
   * @group Props
   */
  ariaLabel;
  /**
   * The breakpoint to define the maximum width boundary.
   * @defaultValue 960px
   * @group Props
   */
  breakpoint = "960px";
  /**
   * Defines a string that labels the dropdown button for accessibility.
   * @group Props
   */
  ariaLabelledBy;
  /**
   * Callback to execute when button is focused.
   * @param {FocusEvent} event - Focus event.
   * @group Emits
   */
  onFocus = new EventEmitter();
  /**
   * Callback to invoke when the component loses focus.
   * @param {FocusEvent} event - Focus event.
   * @group Emits
   */
  onBlur = new EventEmitter();
  listViewChild;
  currentIndex;
  tabindex = 0;
  focused = false;
  focusedOptionIndex = -1;
  _componentStyle = inject(DockStyle);
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  $pcDock = inject(DOCK_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  matchMediaListener;
  query;
  queryMatches = signal(false, ...ngDevMode ? [{
    debugName: "queryMatches"
  }] : []);
  mobileActive = signal(false, ...ngDevMode ? [{
    debugName: "mobileActive"
  }] : []);
  get focusedOptionId() {
    return this.focusedOptionIndex !== -1 && this.focusedOptionIndex !== "-1" ? String(this.focusedOptionIndex) : null;
  }
  constructor(cd) {
    super();
    this.cd = cd;
    this.currentIndex = -3;
  }
  onInit() {
    this.id = this.id || s("pn_id_");
    this.bindMatchMediaListener();
  }
  onDestroy() {
    this.unbindMatchMediaListener();
  }
  itemTemplate;
  _itemTemplate;
  getItemId(item, index) {
    return item && item?.id ? item.id : `${index}`;
  }
  getItemProp(processedItem, name) {
    return processedItem && processedItem.item ? m(processedItem.item[name]) : void 0;
  }
  disabled(item) {
    return typeof item.disabled === "function" ? item.disabled() : item.disabled || false;
  }
  isItemActive(id) {
    return String(id) === String(this.focusedOptionIndex);
  }
  onListMouseLeave() {
    this.currentIndex = -3;
    this.cd.markForCheck();
  }
  onItemMouseEnter(index) {
    this.currentIndex = index;
    if (index === 1) {
    }
    this.cd.markForCheck();
  }
  onItemClick(e, item) {
    if (item.command) {
      item.command({
        originalEvent: e,
        item
      });
    }
  }
  onListFocus(event) {
    this.focused = true;
    this.changeFocusedOptionIndex(0);
    this.onFocus.emit(event);
  }
  onListBlur(event) {
    this.focused = false;
    this.focusedOptionIndex = -1;
    this.onBlur.emit(event);
  }
  onListKeyDown(event) {
    switch (event.code) {
      case "ArrowDown": {
        if (this.position === "left" || this.position === "right") this.onArrowDownKey();
        event.preventDefault();
        break;
      }
      case "ArrowUp": {
        if (this.position === "left" || this.position === "right") this.onArrowUpKey();
        event.preventDefault();
        break;
      }
      case "ArrowRight": {
        if (this.position === "top" || this.position === "bottom") this.onArrowDownKey();
        event.preventDefault();
        break;
      }
      case "ArrowLeft": {
        if (this.position === "top" || this.position === "bottom") this.onArrowUpKey();
        event.preventDefault();
        break;
      }
      case "Home": {
        this.onHomeKey();
        event.preventDefault();
        break;
      }
      case "End": {
        this.onEndKey();
        event.preventDefault();
        break;
      }
      case "Enter":
      case "Space": {
        this.onSpaceKey();
        event.preventDefault();
        break;
      }
      default:
        break;
    }
  }
  onArrowDownKey() {
    const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex);
    this.changeFocusedOptionIndex(optionIndex);
  }
  onArrowUpKey() {
    const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex);
    this.changeFocusedOptionIndex(optionIndex);
  }
  onHomeKey() {
    this.changeFocusedOptionIndex(0);
  }
  onEndKey() {
    this.changeFocusedOptionIndex(Y(this.listViewChild?.nativeElement, 'li[data-pc-section="item"][data-p-disabled="false"]').length - 1);
  }
  onSpaceKey() {
    const element = z(this.listViewChild?.nativeElement, `li[id="${`${this.focusedOptionIndex}`}"]`);
    const anchorElement = element && z(element, "a,button");
    anchorElement ? anchorElement.click() : element && element.click();
  }
  findNextOptionIndex(index) {
    const menuitems = Y(this.listViewChild?.nativeElement, 'li[data-pc-section="item"][data-p-disabled="false"]');
    const matchedOptionIndex = [...menuitems].findIndex((link) => link.id === index);
    return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
  }
  changeFocusedOptionIndex(index) {
    const menuitems = Y(this.listViewChild?.nativeElement, 'li[data-pc-section="item"][data-p-disabled="false"]');
    let order = index >= menuitems.length ? menuitems.length - 1 : index < 0 ? 0 : index;
    this.focusedOptionIndex = menuitems[order]?.getAttribute("id");
  }
  findPrevOptionIndex(index) {
    const menuitems = Y(this.listViewChild?.nativeElement, 'li[data-pc-section="item"][data-p-disabled="false"]');
    const matchedOptionIndex = [...menuitems].findIndex((link) => link.id === index);
    return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
  }
  isClickableRouterLink(item) {
    return !!item.routerLink && !this.disabled(item);
  }
  templates;
  onAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "item":
          this._itemTemplate = item.template;
          break;
        default:
          this._itemTemplate = item.template;
          break;
      }
    });
  }
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  getPTOptions(item, index, key) {
    return this.ptm(key, {
      context: {
        item,
        index
      }
    });
  }
  bindMatchMediaListener() {
    if (!this.matchMediaListener) {
      const query = window.matchMedia(`(max-width: ${this.breakpoint})`);
      this.query = query;
      this.queryMatches.set(query.matches);
      this.matchMediaListener = () => {
        this.queryMatches.set(query.matches);
        this.mobileActive.set(false);
      };
      this.renderer.listen(this.query, "change", this.matchMediaListener.bind(this));
    }
  }
  unbindMatchMediaListener() {
    if (this.matchMediaListener) {
      this.matchMediaListener();
      this.matchMediaListener = null;
      this.query = null;
    }
  }
  static ɵfac = function Dock_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Dock)(ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _Dock,
    selectors: [["p-dock"]],
    contentQueries: function Dock_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, 5);
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function Dock_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c1, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.listViewChild = _t.first);
      }
    },
    hostAttrs: ["data-pc-name", "dock"],
    hostVars: 2,
    hostBindings: function Dock_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
      }
    },
    inputs: {
      id: "id",
      styleClass: "styleClass",
      model: "model",
      position: "position",
      ariaLabel: "ariaLabel",
      breakpoint: "breakpoint",
      ariaLabelledBy: "ariaLabelledBy"
    },
    outputs: {
      onFocus: "onFocus",
      onBlur: "onBlur"
    },
    features: [ɵɵProvidersFeature([DockStyle, {
      provide: DOCK_INSTANCE,
      useExisting: _Dock
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Dock
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    decls: 5,
    vars: 12,
    consts: [["list", ""], ["elseBlock", ""], [3, "pBind"], ["role", "menu", 3, "focus", "blur", "keydown", "mouseleave", "tabindex", "pBind"], ["role", "menuitem", 3, "class", "pBind"], ["role", "menuitem", 3, "class", "pBind", "click", "mouseenter", 4, "ngIf"], ["role", "menuitem", 3, "click", "mouseenter", "pBind"], ["pRipple", "", "routerLinkActive", "router-link-active", "pTooltip", "", 3, "routerLink", "queryParams", "class", "routerLinkActiveOptions", "target", "tooltipOptions", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "pBind", 4, "ngIf", "ngIfElse"], ["pRipple", "", "routerLinkActive", "router-link-active", "pTooltip", "", 3, "routerLink", "queryParams", "routerLinkActiveOptions", "target", "tooltipOptions", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "pBind"], [3, "class", "ngStyle", "pBind", 4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "ngStyle", "pBind"], ["pRipple", "", "pTooltip", "", 3, "tooltipPosition", "tooltipOptions", "target", "pBind"]],
    template: function Dock_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵelementStart(0, "div", 2)(1, "ul", 3, 0);
        ɵɵlistener("focus", function Dock_Template_ul_focus_1_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onListFocus($event));
        })("blur", function Dock_Template_ul_blur_1_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onListBlur($event));
        })("keydown", function Dock_Template_ul_keydown_1_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onListKeyDown($event));
        })("mouseleave", function Dock_Template_ul_mouseleave_1_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onListMouseLeave());
        });
        ɵɵrepeaterCreate(3, Dock_For_4_Template, 1, 1, "li", 4, _forTrack0);
        ɵɵelementEnd()();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.cx("listContainer"));
        ɵɵproperty("pBind", ctx.ptm("listContainer"));
        ɵɵadvance();
        ɵɵclassMap(ctx.cx("list"));
        ɵɵproperty("tabindex", ctx.tabindex)("pBind", ctx.ptm("list"));
        ɵɵattribute("id", ctx.id)("aria-orientation", ctx.position === "bottom" || ctx.position === "top" ? "horizontal" : "vertical")("aria-activedescendant", ctx.focused ? ctx.focusedOptionId : void 0)("aria-label", ctx.ariaLabel)("aria-labelledby", ctx.ariaLabelledBy);
        ɵɵadvance(2);
        ɵɵrepeater(ctx.model);
      }
    },
    dependencies: [CommonModule, NgIf, NgTemplateOutlet, NgStyle, RouterModule, RouterLink, RouterLinkActive, Ripple, TooltipModule, Tooltip, Bind, SharedModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Dock, [{
    type: Component,
    args: [{
      selector: "p-dock",
      standalone: true,
      imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive, Ripple, TooltipModule, SharedModule, Bind],
      template: `
        <div [class]="cx('listContainer')" [pBind]="ptm('listContainer')">
            <ul
                #list
                [attr.id]="id"
                [class]="cx('list')"
                role="menu"
                [attr.aria-orientation]="position === 'bottom' || position === 'top' ? 'horizontal' : 'vertical'"
                [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                [tabindex]="tabindex"
                [attr.aria-label]="ariaLabel"
                [attr.aria-labelledby]="ariaLabelledBy"
                (focus)="onListFocus($event)"
                (blur)="onListBlur($event)"
                (keydown)="onListKeyDown($event)"
                (mouseleave)="onListMouseLeave()"
                [pBind]="ptm('list')"
            >
                @for (item of model; track item.label; let i = $index) {
                    <li
                        *ngIf="item.visible !== false"
                        [attr.id]="getItemId(item, i)"
                        [class]="cn(cx('item', { item, id: getItemId(item, i) }), item?.styleClass)"
                        role="menuitem"
                        [attr.aria-label]="item.label"
                        [attr.aria-disabled]="disabled(item) || false"
                        (click)="onItemClick($event, item)"
                        (mouseenter)="onItemMouseEnter(i)"
                        [pBind]="getPTOptions(item, i, 'item')"
                        [attr.data-p-focused]="isItemActive(getItemId(item, i))"
                        [attr.data-p-disabled]="disabled(item) || false"
                    >
                        <div [class]="cx('itemContent')" [pBind]="getPTOptions(item, i, 'itemContent')">
                            <a
                                *ngIf="isClickableRouterLink(item); else elseBlock"
                                pRipple
                                [routerLink]="item.routerLink"
                                [queryParams]="item.queryParams"
                                [class]="cx('itemLink')"
                                routerLinkActive="router-link-active"
                                [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                                [target]="item.target"
                                [attr.tabindex]="item.disabled ? null : item.tabindex ? item.tabindex : '-1'"
                                pTooltip
                                [tooltipOptions]="item.tooltipOptions"
                                [fragment]="item.fragment"
                                [queryParamsHandling]="item.queryParamsHandling"
                                [preserveFragment]="item.preserveFragment"
                                [skipLocationChange]="item.skipLocationChange"
                                [replaceUrl]="item.replaceUrl"
                                [state]="item.state"
                                [attr.aria-hidden]="true"
                                [pBind]="getPTOptions(item, i, 'itemLink')"
                            >
                                <span [class]="cn(cx('itemIcon'), item.icon)" *ngIf="item.icon && !itemTemplate && !_itemTemplate" [ngStyle]="item.iconStyle" [pBind]="getPTOptions(item, i, 'itemIcon')"></span>
                                <ng-container *ngTemplateOutlet="itemTemplate || itemTemplate; context: { $implicit: item }"></ng-container>
                            </a>
                            <ng-template #elseBlock>
                                <a
                                    [tooltipPosition]="item.tooltipPosition"
                                    [attr.href]="item.url || null"
                                    [class]="cx('itemLink')"
                                    pRipple
                                    pTooltip
                                    [tooltipOptions]="item.tooltipOptions"
                                    [target]="item.target"
                                    [attr.tabindex]="item.disabled ? null : item.tabindex ? item.tabindex : '-1'"
                                    [attr.aria-hidden]="true"
                                    [pBind]="getPTOptions(item, i, 'itemLink')"
                                >
                                    <span [class]="cn(cx('itemIcon'), item.icon)" *ngIf="item.icon && !itemTemplate && !_itemTemplate" [ngStyle]="item.iconStyle" [pBind]="getPTOptions(item, i, 'itemIcon')"></span>
                                    <ng-container *ngTemplateOutlet="itemTemplate || _itemTemplate; context: { $implicit: item }"></ng-container>
                                </a>
                            </ng-template>
                        </div>
                    </li>
                }
            </ul>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [DockStyle, {
        provide: DOCK_INSTANCE,
        useExisting: Dock
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Dock
      }],
      host: {
        "[class]": 'cn(cx("root"), styleClass)',
        "data-pc-name": "dock"
      },
      hostDirectives: [Bind]
    }]
  }], () => [{
    type: ChangeDetectorRef
  }], {
    id: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    model: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }],
    breakpoint: [{
      type: Input
    }],
    ariaLabelledBy: [{
      type: Input
    }],
    onFocus: [{
      type: Output
    }],
    onBlur: [{
      type: Output
    }],
    listViewChild: [{
      type: ViewChild,
      args: ["list", {
        static: false
      }]
    }],
    itemTemplate: [{
      type: ContentChild,
      args: ["item"]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var DockModule = class _DockModule {
  static ɵfac = function DockModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DockModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _DockModule,
    imports: [Dock, SharedModule],
    exports: [Dock, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Dock, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DockModule, [{
    type: NgModule,
    args: [{
      imports: [Dock, SharedModule],
      exports: [Dock, SharedModule]
    }]
  }], null, null);
})();
export {
  Dock,
  DockClasses,
  DockModule,
  DockStyle
};
//# sourceMappingURL=primeng_dock.js.map
