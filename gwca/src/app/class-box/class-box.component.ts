import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ClassStorageService } from '../class-storage.service';
import { jsPlumb } from 'jsplumb';

@Component({
  selector: 'app-class-box',
  templateUrl: './class-box.component.html',
  styleUrls: ['./class-box.component.css']
})
export class ClassBoxComponent implements OnInit, AfterViewInit {
  name: string;
  variables: string[];
  methods: string[];
  //jsplumb settings for connectors
  source = {
    endpoint: "Rectangle",
    isSource: true,
    isTarget: false,
    maxConnections: 1,
  };

  target = {
    endpoint: "Dot",
    isSource: false,
    isTarget: true,
    maxConnections: 1,

  }


  constructor(private classService: ClassStorageService) { 
  }

  ngOnInit() {
    this.name = this.classService.allClasses[0]['name'];
    this.variables = this.classService.allClasses[0]['variables'];
    this.methods = this.classService.allClasses[0]['methods'];

  }

  //have to wait otherwise can't find element in DOM and won't make draggable
  ngAfterViewInit(){
    setTimeout(() =>
    this.classService.jsPlumbInstance.draggable(document.getElementById(this.name)), 
    100);
    //add source connector (connect to others)
    this.classService.jsPlumbInstance.addEndpoint(this.name,this.classService.source);
    //add target connector (get connected to)
    this.classService.jsPlumbInstance.addEndpoint(this.name,this.classService.target);
  }



}
