import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { TagGroup } from 'src/app/model/TagGroup';

@Component({
  selector: 'tag-group',
  templateUrl: './tag-group.component.html'
})
export class TagGroupComponent {

  constructor(
    dataService: DataService,
    private router: Router
  ) { 
    //dataService.observeTagGroup(tagGroup => this.tagGroup = tagGroup);
  }

  tagGroup: TagGroup = new TagGroup();

  back() {
    this.router.navigateByUrl('root')
  }

  addTag() {
    this.tagGroup.tags.push("New tag");
  }

  removeTag(index: number) {
    this.tagGroup.tags.splice(index, 1);
  }

}
