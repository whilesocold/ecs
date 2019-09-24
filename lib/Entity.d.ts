import { Component, ComponentClass } from "./Component";
import { EventEmitter } from "events";
declare type EntityChangeListener = (entity: Entity) => any;
declare enum EntityEvent {
    ComponentAdded = "EntityEvent.ComponentAdded",
    ComponentRemoved = "EntityEvent.ComponentRemoved"
}
declare class Entity extends EventEmitter {
    private _id;
    private readonly _components;
    private readonly _listeners;
    private readonly _componentClasses;
    constructor();
    id: string;
    isNew(): boolean;
    listComponents(): Component[];
    listComponentsWithTypes(): {
        component: Component;
        type: ComponentClass<Component>;
    }[];
    listComponentsWithTags(): Readonly<{
        tag: string;
        component: Component;
    }>[];
    hasComponent<T extends Component>(componentClass: ComponentClass<T>): boolean;
    getComponent<T extends Component>(componentClass: ComponentClass<T>): T;
    addComponent<T extends Component>(componentClass: ComponentClass<T>, props?: any): T;
    removeComponent<T extends Component>(componentClass: ComponentClass<T>): void;
    cast<T extends Component>(component: Component | undefined | null, componentClass: ComponentClass<T>): component is T;
    addChangeListener(listener: EntityChangeListener): this;
    removeChangeListener(listener: EntityChangeListener): this;
}
export { Entity, EntityEvent, EntityChangeListener };
