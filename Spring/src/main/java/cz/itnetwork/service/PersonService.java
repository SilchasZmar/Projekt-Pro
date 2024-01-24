package cz.itnetwork.service;

import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.PersonStatistic;

import java.util.List;

public interface PersonService {

    /**
     * Creates a new person
     *
     * @param personDTO Person to create
     * @return newly created person
     */
    PersonDTO addPerson(PersonDTO personDTO);

    /**
     * <p>Sets hidden flag to true for the person with the matching [id]</p>
     * <p>In case a person with the passed [id] isn't found, the method <b>silently fails</b></p>
     *
     * @param id Person to delete
     */
    void removePerson(long id);

    /**
     * Fetches all non-hidden persons
     *
     * @return List of all non-hidden persons
     */
    List<PersonDTO> getAll();


    /**
     * Get a person detail info by id
     * @param personId
     * @return data of person
     */
    PersonDTO getPerson(Long personId);

    /**
     * Aktualizuje údaje osoby podle informací v objektu PersonDTO.
     * Při úspěšné editaci provede skrytí původní osoby.
     *
     * @param personDTO Nové informace o osobě.
     * @param id osoby, která má být upravena.
     * @return DTO reprezentaci upravené osoby.
     */
    PersonDTO editPerson(PersonDTO personDTO, long id);

    /**
     * Metoda pro získání statistik o osobách.
     * jméno a celkové příjmy osoby.
     * @return Seznam statistik osob.
     */
    List<PersonStatistic> getPersonStatistics();
}
